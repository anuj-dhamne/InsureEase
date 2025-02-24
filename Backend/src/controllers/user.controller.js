import { User } from "../models/user.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId);
        if(!user){
            throw new ApiError(404,"User not exist !");
        }
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
       await user.save({validateBeforeSave:false});

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(404,"User not exist !");
    }
}

const userRegister=asyncHandler(async (req,res)=>{

    // getting user data
    const {name,username,email,phone,password}=req.body;

    // validate data
    if([name,username,email,password,phone].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"Fields are required")
    }

    // checking user already exists or not
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(400,"username already exists with this email or username");
    }

    // Uploading profile picture
    const avatorLocalPath=req.files?.avator?.[0]?.path;
    if(!avatorLocalPath)
        {throw new ApiError(400,"Avator file is required");}

    // upload on cloudinary 
    const avator=await uploadOnCloudinary(avatorLocalPath);

    if(!avator){throw new ApiError(400,"Avator file required")};

    // creating user Object and upload entry in DB
    const user=await User.create({
        name,
        email,
        username:username.toLowerCase(),
        phone,
        password,
        avator:avator.url,
       
    })
    // removing password and refreshtoken fro sending response

    const createdUser=await User.findById(user._id).select("-password -refreshToken") ;

    // check for user creation 
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while regestring the user !")
    }
    // return responses
    return res.status(201).json(new ApiResponse(200,createdUser,"User Created Successfully !"));
})

const loginUser=asyncHandler(async (req,res)=>{
 const {username,password}=req.body;
 if(!username){
    throw new ApiError(400,"Username required ! ")
 }
 const user=await User.findOne({
    username
 })
 if(!user){
    throw new ApiError(400,"No Such user with above username exists !")
 }
 const isPassword=await user.isPasswordCorrect(password);

 if(!isPassword){
    throw new ApiError(400,"Password is incorrect ! ");
 }
//  TODO: token to bo added

 const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id);

 const loggedUser= await User.findById(user._id).select("-password -refreshToken");

 const options={
    httpOnly:true,
    // secure:process.env.NODE_ENV==="production",
    // path:"/",
    secure:true,
    sameSite: "None"
 }

 return res
 .status(201)
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json(new ApiResponse(201,{user:loggedUser,accessToken,refreshToken},"Loggedin Successfull !"))
})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },{
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User Logout Successfully !"));
})


const updateAccountDetails=asyncHandler(async(req,res)=>{
    const {name,email,phone}=req.body;

  if(!(name && phone && email)){
    throw new ApiError(400,"All fields are required ! ");
  }

  const user =await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        name,email,phone
      }
    },
    {
      new :true
    }

  ).select("-password");

  return res.status(200)
            .json(new ApiResponse(
              200,
              user,
              "Details updated Successfully "
            ))
})

const updateAvator=asyncHandler(async(req,res)=>{
    const avatorLocalPath=req.file?.path;
  if(!avatorLocalPath){
    throw new ApiError(400,"Avator file required ! ")
  }
  const avator=await uploadOnCloudinary(avatorLocalPath);

  if(!avator.url){
    throw new ApiError(400,"Error required for uploading on avator ! ")
  }

  const user=await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{avator:avator.url}
    },
    {
      new:true,
    }
  ).select("-password")

  return res.status(200).json(new ApiResponse(200,user,"Avator upload Successfully "));
})

const getCurrentUser=asyncHandler(async (req,res)=>{
    return res.status(200).json(new ApiResponse(200 ,req.user,"current user fetched successfully"));
   })

const changeCurrentPassword=asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword}=req.body;
  
    const user=await User.findById(req.user?._id)
  
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword);
  
    if(!isPasswordCorrect){
      throw new ApiError(401,"The password is Incorrect ! ");
    }
    user.password=newPassword;
   await user.save({validateBeforeSave :false});
  
  return res.status(200).json(new ApiResponse (200,{},"Password Change Successfully ! "))
    
  })
  const refreshAccessToken = asyncHandler(async (req,res)=>{
    
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken;
 
    if(!incomingRefreshToken){
     throw new ApiError(401 ," Unauthorised request ! ");
    }
 
    try {
     const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
  
     const user=await User.findById(decodedToken?._id)
  
     if(!user){
      throw new ApiError(401,"Invalid refresh token");
     }
     if(incomingRefreshToken!==user?.refreshToken){
      throw new ApiError(401,"Refresh token is expired !");
     }
  
    const options={
      httpOnly:true,
      secure:true,
    }
    
   const {accessToken,newRefreshToken}=await generateAccessAndRefreshToken(user._id) ;

   return res
   .status(200)
   .cookie("accessToken",accessToken,options)
   .cookie("refreshToken",newRefreshToken,options)
   .json(
    new ApiResponse(200,{accessToken,refreshToken:newRefreshToken},"Access token refresh")
   )
    } catch (error) {
     throw new ApiError(401,error?.message || "Invalid refresh token ! ");
    }
 })

//  TODO : complete this function 

//  const editExpendamount=asyncHandler((req,res)=>{

//  })

export {userRegister,
    loginUser,
    logoutUser,
    updateAccountDetails,
    updateAvator,
    getCurrentUser,
    changeCurrentPassword,
    refreshAccessToken
}
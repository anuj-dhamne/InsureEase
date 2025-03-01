// import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshToken=async(adminId)=>{
    try {
        const admin=await User.findById(adminId);
        if(!admin){
            throw new ApiError(404,"admin not exist !");
        }
        const accessToken=admin.generateAccessToken();
        const refreshToken=admin.generateRefreshToken();

        admin.refreshToken=refreshToken;
       await admin.save({validateBeforeSave:false});

        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(404,"admin not exist !");
    }
}

const adminRegister=asyncHandler(async (req,res)=>{

    // getting user data
    const {companyName,email,phone,password,address,termsAndConditions,insuranceTypes}=req.body;

    // validate data
    if([companyName,address,email,password,phone].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"Fields are required")
    }
    if(!termsAndConditions){
        return res.status(400).json(new ApiResponse(400,"Must accept tnc"));
    }
    if(!insuranceTypes || insuranceTypes.length===0){
        return res.status(400).json(new ApiResponse(400,"add insurance types"));

    }

    // checking user already exists or not
    const existedAdmin=await Admin.findOne({email
    })
    if(existedAdmin){
        throw new ApiError(400,"username already exists with this email ");
    }

    // creating user Object and upload entry in DB
    const admin=await Admin.create({
        companyName,
        email,
        phone,
        password,
        address,
        termsAndConditions,
        insuranceTypes
       
    })
    // removing password and refreshtoken fro sending response

    const createdAdmin=await Admin.findById(admin._id).select("-password -refreshToken") ;

    // check for user creation 
    if(!createdAdmin){
        throw new ApiError(500,"Something went wrong while regestring the admin !")
    }
    // return responses
    return res.status(201).json(new ApiResponse(200,createdAdmin,"Admin Created Successfully !"));
})

const loginAdmin=asyncHandler(async (req,res)=>{
 const {email,password}=req.body;
 if(!email){
    throw new ApiError(400,"Username required ! ")
 }
 const admin=await Admin.findOne({
    email
 })
 if(!admin){
    throw new ApiError(400,"No Such user with above username exists !")
 }
 const isPassword=await admin.isPasswordCorrect(password);

 if(!isPassword){
    throw new ApiError(400,"Password is incorrect ! ");
 }
//  TODO: token to bo added

 const {accessToken,refreshToken}= await generateAccessAndRefreshToken(admin._id);

 const loggedAdmin= await User.findById(user._id).select("-password -refreshToken");

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
 .json(new ApiResponse(201,{admin:loggedAdmin,accessToken,refreshToken},"Loggedin Successfull !"))
})

const logoutUser=asyncHandler(async(req,res)=>{
    await Admin.findByIdAndUpdate(
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
    const {email,phone,address}=req.body;

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

export {adminRegister,
    loginAdmin,
    logoutUser,
    updateAccountDetails,
    getCurrentUser,
    changeCurrentPassword,
    refreshAccessToken
}
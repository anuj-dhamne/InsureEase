import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const verifyJWT=asyncHandler(async (req,res,next)=>{

// try {
//     const token=req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
//     console.log("Token Received : ",token);
//     console.log("Access Token Received:", req.cookies.accessToken);
//     console.log("Authorization Header:", req.headers.authorization);

//     // console.log("Using secret:", process.env.ACCESS_TOKEN_SECRET);
//     // const decoded = jwt.decode(token, { complete: true });
//     // console.log("Decoded token:", decoded);
//     // console.log("Raw token:", `"${token}"`);  // Ensure no spaces

//     if(!token){
//         throw new ApiError(401,"Unauthorised request !");
//     }
    
//     const decodedToken =jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
//     console.log("Decoded token:", decodedToken);

//     const user =await User.findById(decodedToken._id).select("-password -refreshToken")
//     if(!user){
//         throw new ApiError(401,"Invalid Access token");
//     }
//     req.user=user;
//     next();
// } catch (error) {
//     console.error("JWT Error:", error.message);
//     throw new ApiError(401,error?.message||"Invalid access Token ");
// }

try {
    // console.log(req);
    console.log("cookies : ",req.cookies);
        const token=req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
    console.log("Access Token to Verify:", token);
    console.log("JWT Secret Key:", process.env.ACCESS_TOKEN_SECRET);
    
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded token:", decodedToken);
       
    req.admin=decodedToken;
    next();
} catch (error) {
    console.log("JWT Verification Error:", error.message);
    throw new ApiError(401, error.message);  // Print actual error message
}

})




export {verifyJWT}
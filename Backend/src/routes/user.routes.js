import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {  
    changeCurrentPassword, 
    getCurrentUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    updateAccountDetails,
    updateAvator,
   userRegister
         } from "../controllers/user.controller.js";

const userRouter=Router();

//  register route
userRouter.route("/register").post(
    upload.fields([{
        name:"avator",
        maxCount:1
    }]),
    userRegister);

// login route
userRouter.route("/login").post(loginUser)

// logout route
userRouter.route("/logout").post(verifyJWT,logoutUser)

// refresh token route
userRouter.route("/refresh-token").post(refreshAccessToken)

// change password route
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword)

// get current user route
userRouter.route("/current-user").get(verifyJWT, getCurrentUser)

// update user detail route
userRouter.route("/update-details").patch(verifyJWT, updateAccountDetails)

// update avator route
userRouter.route("/update-avator").patch(verifyJWT, upload.single("avator"), updateAvator);



export default userRouter


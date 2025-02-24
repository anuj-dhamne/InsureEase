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

const router=Router();

//  register route
router.route("/register").post(
    upload.fields([{
        name:"avator",
        maxCount:1
    }]),
    userRegister);

// login route
router.route("/login").post(loginUser)

// logout route
router.route("/logout").post(verifyJWT,logoutUser)

// refresh token route
router.route("/refresh-token").post(refreshAccessToken)

// change password route
router.route("/change-password").post(verifyJWT, changeCurrentPassword)

// get current user route
router.route("/current-user").get(verifyJWT, getCurrentUser)

// update user detail route
router.route("/update-details").patch(verifyJWT, updateAccountDetails)

// update avator route
router.route("/update-avator").patch(verifyJWT, upload.single("avator"), updateAvator);



export default router


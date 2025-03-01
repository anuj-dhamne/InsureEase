import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { adminRegister, loginAdmin, refreshAccessToken } from "../controllers/admin.controller.js";

const adminRouter=Router();

adminRouter.route("/register").post(adminRegister);
adminRouter.route("/login").post(loginAdmin);
adminRouter.route("/refresh-token").post(refreshAccessToken);

export default adminRouter;
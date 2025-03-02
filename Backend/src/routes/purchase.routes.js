import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { allUserofAdmin, approvePurchase, cancelPurchase, getAllPendingPurchases, getPurchaseDetail, getUserPurchase, purchasePolicy, rejectPurchase } from "../controllers/purchase.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const purchaseRouter=Router();

// ##------ for user purchase routes --->

// purchase policy route
purchaseRouter.route("/purchase-policy/:id").post(verifyJWT,
    upload.array("documentFiles", 10),
        purchasePolicy
)

// get user purchase route
purchaseRouter.route("/all-user-purchase").get(verifyJWT,getUserPurchase);

// get purchase detail 
purchaseRouter.route("/purchase-detail/:id").get(verifyJWT,getPurchaseDetail);

// cancel purchase route
purchaseRouter.route("/cancel-purchase/:id").post(verifyJWT,cancelPurchase);

// make payment route


// ##------ for admin purchase routes --->

// all pending purchase route 
purchaseRouter.route("/all-pending-purchase").get(verifyJWT,getAllPendingPurchases);

// approve purchase route 
purchaseRouter.route("/approve-purchase/:id").post(verifyJWT,approvePurchase);

// reject purchase route
purchaseRouter.route("/reject-purchase/:id").post(verifyJWT,rejectPurchase);

purchaseRouter.route("/all-user-admin").get(verifyJWT,allUserofAdmin);

export default purchaseRouter;
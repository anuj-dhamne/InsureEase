
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    createClaim, 
    getAllClaims, 
    getUserClaims, 
    getSingleClaim, 
    updateClaimStatus 
} from "../controllers/claim.controller.js";

const claimRouter = Router();

// Create a claim
claimRouter.route("/create-claim").post(verifyJWT, createClaim);

// Get all claims (Admin)
claimRouter.route("/all-claims").get(verifyJWT, getAllClaims);

// Get claims for a specific user
claimRouter.route("/user-claims").get(verifyJWT, getUserClaims);

// Get a single claim by ID
claimRouter.route("/single-claim/:id").get(verifyJWT, getSingleClaim);

// Update claim status (Admin)
claimRouter.route("/update-claim/:id").patch(verifyJWT, updateClaimStatus);

export default claimRouter;
import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createPolicy, getAllPolicies, getPolicyofUser, getSinglePolicy, updatePolicy } from "../controllers/policy.controller.js";

const policyRouter=Router();


// create policy route
policyRouter.route("/create-policy").post(verifyJWT,createPolicy)

// get all policy route
policyRouter.route("/all-policies").get(verifyJWT,getAllPolicies)

// get policy for a specific user route
policyRouter.route("/user-all-policies").get(verifyJWT,getPolicyofUser)

// get current policy route
policyRouter.route("/single-policy").get(verifyJWT,getSinglePolicy)

// update policy info ...
policyRouter.route("/update-policy").patch(verifyJWT,updatePolicy);
export default policyRouter;

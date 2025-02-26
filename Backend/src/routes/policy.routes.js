import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { createPolicy, getAllPolicies, getPolicyofAdmin, getSinglePolicy, updatePolicy } from "../controllers/policy.controller.js";

const policyRouter=Router();


// create policy route
policyRouter.route("/create-policy").post(verifyJWT,createPolicy)

// get all policy route
policyRouter.route("/all-policies").get(getAllPolicies)

// get policy for a specific user route
policyRouter.route("/admin-all-policies").get(verifyJWT,getPolicyofAdmin)

// get current policy route
policyRouter.route("/single-policy/:id").get(getSinglePolicy)

// update policy info ...
policyRouter.route("/update-policy/:id").patch(verifyJWT,updatePolicy);
export default policyRouter;

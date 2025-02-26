import { Policy } from "../models/policy.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";

const createPolicy= asyncHandler(async(req,res)=>{
    const user=req.user._id;
    // const user_data=await User.findById(user);
    // const user_name=user_data;
    const {name,category,provider,premium,tenure,features,requiredDocuments,termsAndConditions}=req.body;

    if([name,category,provider,termsAndConditions].map((field)=>{
        if(field.trim()===""){
            throw new ApiError(400,"All Fields are Required ! ");
        }
    }))
    if(premium===0 || tenure===0){
        throw new ApiError(400,"premium and tenure not ne zero");
    }
    if(features.length<1 || requiredDocuments.length<1){
        throw new ApiError(400,"All Fields are Required ! ");
    }

    const newPolicy= await Policy.create({
        name,
        category,
        provider,
        provider_id:user,
        premium,
        tenure,
        features,
        requiredDocuments,
        termsAndConditions,
    })

    const createdPolicy=await Policy.findById(newPolicy._id).select("");

    if(!createdPolicy){
        throw new ApiError("500","Something went wrong ! ");
    }
    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                createdPolicy,
                "Policy created Successfully !"
            )
        );

})

const getAllPolicies=asyncHandler(async(req,res)=>{
    const allPolicies=await Policy.find({});
    if(!allPolicies){
        throw new ApiError(400,"No such policies ");
    }
    return res.status(200)
    .json(new ApiResponse(200,allPolicies,"all policies "))
})

const getPolicyofAdmin=asyncHandler(async(req,res)=>{
    const user=req.user._id;
    if(!user){
        throw ApiError(400,"Unauthorised request ! ");
    }
    const allPolicies=await Policy.find({provider_id:user});
    if(!allPolicies){
        throw new ApiError(400,"No such policies for such user/admin");
    }
    return res.status(200)
    .json(new ApiResponse(200,allPolicies,"all policies of current user/admin"))
})

const getSinglePolicy=asyncHandler(async(req,res)=>{
const policyId=req.params.id;
if(!policyId){
    throw new ApiError(400,"Unauthorised request !");
}
const policy=await Policy.findById(policyId);
if(!policy){
    throw new ApiError(500,"Something went Wrong !");
}
return res.status(200).json(new ApiResponse(200,policy,"Got a Policy info ! "));
})

const updatePolicy=asyncHandler(async(req,res)=>{
const policyId=req.params.id;
if(!policyId){
    throw new ApiError(400,"Unauthorised request !");
}
const {name,premium,tenure,features,requiredDocuments,termsAndConditions} =req.body;

if([name,termsAndConditions].map((field)=>{
    if(field.trim()===""){
        throw new ApiError(400,"All Fields are Required ! ");
    }
}))
if(premium===0 || tenure===0){
    throw new ApiError(400,"premium and tenure not ne zero");
}
if(features.length<1 || requiredDocuments.length<1){
    throw new ApiError(400,"All Fields are Required ! ");
}

const updatedPolicy=await Policy.findByIdAndUpdate(
    policyId,
    {
        $set:{name,premium,tenure,features,requiredDocuments,termsAndConditions}
    },
    {
        new:true
    }
);
if(!updatedPolicy){
    throw ApiError(500,"Something went wrong ! ");
}
return res.status(200).json(new ApiResponse(200,updatedPolicy,"Policy get Updated"));

})

export {createPolicy,getAllPolicies,getSinglePolicy,updatePolicy,getPolicyofAdmin}
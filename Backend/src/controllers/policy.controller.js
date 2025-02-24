import { Policy } from "../models/policy.model.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const createPolicy= asyncHandler(async(req,res)=>{
    const user_id=req._id;
    const {name,category,provider,premium,tenure,feature,requiredDocuments,termsAndConditions}=req.body;

    if([name,category,premium,provider,tenure,termsAndConditions].map((field)=>{
        if(field.trim()===""){
            throw new ApiError(400,"All Fields are Required ! ");
        }
    }))
    if(feature.length<1 || requiredDocuments.length<1){
        throw new ApiError(400,"All Fields are Required ! ");
    }

    const newPolicy= await Policy.create({
        name,
        category,
        provider,
        provider_id:user_id,
        premium,
        tenure,
        feature,
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

const getPolicyofUser=asyncHandler(async(req,res)=>{
    const user=req._id;
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
const {name,premium,tenure,feature,requiredDocuments,termsAndConditions} =req.body;

if([name,premium,tenure,termsAndConditions].map((field)=>{
    if(field.trim()===""){
        throw new ApiError(400,"All Fields are Required ! ");
    }
}))
if(feature.length<1 || requiredDocuments.length<1){
    throw new ApiError(400,"All Fields are Required ! ");
}

const updatedPolicy=await Policy.findByIdAndUpdate(
    policyId,
    {
        $set:{name,premium,tenure,feature,requiredDocuments,termsAndConditions}
    },
    {
        new:true
    }
);
if(!updatedPolicy){
    throw ApiError(500,"Something went wrong ! ");
}
return res.status(200).json(200,updatedPolicy,"Policy get Updated");

})

export {createPolicy,getAllPolicies,getSinglePolicy,updatePolicy,getPolicyofUser}
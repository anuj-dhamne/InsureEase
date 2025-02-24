import Document from "../models/document.model";
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const uploadDocument = asyncHandler(async(req,res)=>{
    const {fileName}=req.body;
    if(fileName.trim()===""){
        throw new ApiError(400,"File name is required ! ");
    }
    const user=req._id;
    const documentLocalPath=req.files?.document?.[0]?.path;
    if(!documentLocalPath)
        {throw new ApiError(400,"File is required");}

    // upload on cloudinary 
    const documentLink=await uploadOnCloudinary(documentLocalPath);

    if(!documentLink){throw new ApiError(400,"File is required ")};

    const document=await Document.create({
        fileName,
        owner:user,
        fileUrl:documentLink
    })

    const uplodedDocument =await Document.findById(document._id);
    if(!uplodedDocument){
        return new ApiError(500,"Something went wrong in uploading document");
    }
    return res.status(201).json(new ApiResponse(200,uplodedDocument,"Document get uploded successfully ! "));

})

const getAllDocument=asyncHandler(async(req,res)=>{
    const user =req.user._id;
    if(!user){
        return new ApiError (400,"Unauthorised req in get all document");
    }
    const allDocuments=await Document.find({owner:user});
    if(!allDocuments){
        throw new ApiError(400,"No Docimennt")
    }
    return res.status(200).json(200,allDocuments,"All Documents of current user !");
})

const deleteDoucument=asyncHandler(async(req,res)=>{
    const documentId=req.params.id;
    if(documentId){
        throw new ApiError(400,"Unauthorised request ! ");
    }
    const deleteDoucument=await Document.findByIdAndDelete(documentId);
    if(!deleteDoucument){
        throw new ApiError(500 ,"Document is not get deleted ! ");
    }
    return res.status(200).json(new ApiResponse(200,deleteDoucument,"Document get deleted ! "));
})

export {uploadDocument,getAllDocument,deleteDoucument}
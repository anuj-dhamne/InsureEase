import Document from "../models/document.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || "default_secret"; // Ensure this is set securely

// Encryption Function
const encryptData = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_SECRET, "hex"), iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
};

// Decryption Function
const decryptData = (encryptedText) => {
    const [ivHex, encrypted] = encryptedText.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_SECRET, "hex"), iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

// Upload Document with Encryption
const uploadDocument = asyncHandler(async (req, res) => {
    const { fileName } = req.body;

    if (!fileName || fileName.trim() === "") {
        throw new ApiError(400, "File name is required!");
    }

    const userId = req.user._id;
    const documentLocalPath = req.files?.document?.[0]?.path;

    if (!documentLocalPath) {
        throw new ApiError(400, "File is required");
    }

    // Upload to Cloudinary
    const documentLink = await uploadOnCloudinary(documentLocalPath);
    if (!documentLink?.url) {
        throw new ApiError(400, "File upload failed");
    }

    // Encrypt document URL before saving
    const encryptedContent = encryptData(documentLink.url);

    // Save document to the database
    const document = await Document.create({
        fileName,
        userId,
        encryptedContent,
    });

    return res.status(201).json(new ApiResponse(201, document, "Document uploaded successfully!"));
});

// Get All Documents with Decryption
const getAllDocument = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(401, "Unauthorized request in get all documents");
    }

    const allDocuments = await Document.find({ userId });

    if (!allDocuments.length) {
        throw new ApiError(404, "No documents found");
    }

    // Decrypt document content before sending response
    const decryptedDocuments = allDocuments.map((doc) => ({
        ...doc._doc,
        decryptedContent: decryptData(doc.encryptedContent),
    }));

    return res.status(200).json(new ApiResponse(200, decryptedDocuments, "All documents retrieved successfully!"));
});

// Delete Document
const deleteDocument = asyncHandler(async (req, res) => {
    const documentId = req.params.id;

    if (!documentId) {
        throw new ApiError(400, "Document ID is required!");
    }

    const deletedDocument = await Document.findByIdAndDelete(documentId);

    if (!deletedDocument) {
        throw new ApiError(404, "Document not found or already deleted!");
    }

    return res.status(200).json(new ApiResponse(200, deletedDocument, "Document deleted successfully!"));
});

export { uploadDocument, getAllDocument, deleteDocument };

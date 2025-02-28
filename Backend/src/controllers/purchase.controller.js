import Purchase from "../models/purchase.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Policy } from "../models/policy.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { createReminder } from "./reminder.controller.js";

// For users 

const purchasePolicy = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;
    const policyId = req.params.id;
    // const documentFiles = req.files?.documentFiles;

        const documentFiles=req.files;

    // in frontend create array of object with fileName and file 
    // if (!documentFiles || !Array.isArray(documentFiles) || documentFiles.length === 0) {
    //     return next(new ApiError(400, "Required documents are missing"));
    // }



if (!documentFiles || documentFiles.length === 0) {
   throw new ApiError(400, "Required documents are missing")
}


    const policy = await Policy.findById(policyId);
    if (!policy) {
        return res.status(404).json(new ApiResponse(400, "policy not found!"));
    }
    // uploading document on cloudinary 

    const uploadedDocuments = [];
    try {
        const uploadResults = await Promise.all(
            documentFiles.map(async (file) => {
                if (!file || !file.path) throw new ApiError(400, "Invalid document format");

                const result = await uploadOnCloudinary(file.path);
                if (!result) throw new ApiError(500, "Failed to upload document");

                return { filename: file.originalname, url: result.secure_url };
            })
        );
        uploadedDocuments.push(...uploadResults);
    } catch (error) {
        return next(error);
    }


    const new_premiumAmount = policy.premium;
    const renewalDate = new Date(Date.now() + policy.tenure * 365 * 24 * 60 * 60 * 1000);

    const newPurchase = await Purchase.create({
        userId,
        policyId,
        provider_id:policy.provider_id,
        premiumAmount: new_premiumAmount,
        renewalDate,
        status: "Pending",
        paymentStatus: "Pending",
        documents: uploadedDocuments, // Array of objects [{ filename, url }]
    });

    try {
        await createReminder(userId, policyId, renewalDate);
    } catch (err) {
        console.error("Failed to create reminder:", err);
    }

    res.status(201).json(new ApiResponse(201, newPurchase, "Application is submitted to admin"))
})

const getUserPurchase = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const purchases = await Purchase.find({ userId }).populate("policyId", "name premium tenure");
    if (!purchases || purchases.length === 0) {
        throw new ApiResponse(404, "No purchase record found")
    }
    res.status(200).json(new ApiResponse(200, purchases, "User purchase history retrieved successfully"));
})

const getPurchaseDetail = asyncHandler(async (req, res) => {
    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
        throw new ApiError(400, "Purchase record not found");
    }

    res.status(200).json(new ApiResponse(200, purchase, "Purchase detail retrivded ! "));
})
const cancelPurchase = asyncHandler(async (req, res) => {
    const purchaseId = req.params.id;
    const userId = req.user._id;

    const purchase = await Purchase.findOne({ _id: purchaseId, userId });

    if (!purchase) {
        throw new ApiError(400, "Purchase record not found !");
    }

    if (purchase.status !== "Pending") {
        throw new ApiError(400, "Only pending purchases can be canceled");
    }

    await Purchase.findByIdAndDelete(purchaseId);
    res.status(200).json(new ApiResponse(200, purchase, "Purchase request canceled successfully"));
})
const makePayment = asyncHandler(async (req, res) => {
    const { id } = req.params; // Purchase ID from request parameters
    const userId = req.user._id; // Authenticated user

    // Find the purchase
    const purchase = await Purchase.findById(id);
    if (!purchase) {
        return next(new ApiError(404, "Purchase not found"));
    }

    // Ensure the user owns this purchase
    if (purchase.userId.toString() !== userId.toString()) {
        return next(new ApiError(403, "Unauthorized access"));
    }

    // Check if payment is already completed
    if (purchase.paymentStatus === "Completed") {
        return next(new ApiError(400, "Payment already completed"));
    }

    // TODO: Integrate with actual payment gateway (e.g., Stripe, Razorpay)
    const paymentSuccess = true; // Simulating a successful payment

    if (!paymentSuccess) {
        return next(new ApiError(500, "Payment processing failed"));
    }

    // Update payment status
    purchase.paymentStatus = "Completed";
    purchase.status = "Active"; // Activate policy after successful payment
    await purchase.save();

    // Send response
    res.status(200).json(new ApiResponse(200, purchase, "Payment successful"));
})
//  For admin
const getAllPendingPurchases = asyncHandler(async (req, res) => {
    const adminId = req.user._id;
    const pendingPurchases = await Purchase.find({ status: "Pending", provider_id: adminId });

    if (!pendingPurchases.length) {
        throw new ApiError(404, "No pending purchases found.")
    }

    // Manually fetching user and policy details
    const detailedPurchases = await Promise.all(
        pendingPurchases.map(async (purchase) => {
            const user = await User.findById(purchase.userId).select("name email");
            const policy = await Policy.findById(purchase.policyId).select("policyName premium tenure");

            return {
                ...purchase.toObject(),
                user: user ? { name: user.name, email: user.email } : null,
                policy: policy ? { policyName: policy.policyName, premium: policy.premium, tenure: policy.tenure } : null,
            };
        })
    );

    res.status(200).json(new ApiResponse(200, detailedPurchases, "All pending purchases fetched successfully."));
})
const approvePurchase = asyncHandler(async (req, res) => {
    const purchaseId = req.params.id; // Get purchase ID from request parameters
    const adminId = req.user._id; // Assuming admin authentication is in place

    // Find the purchase request
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
        throw new ApiError(404, "Purchase request not found");
    }

    // Ensure the purchase is pending
    if (purchase.status !== "Pending") {
        throw new ApiError(400, "Only pending purchases can be approved");
    }

    // Mark as approved (Active) and update payment status
    purchase.status = "Active";
    purchase.paymentStatus = "Completed"; // Assuming payment is done during approval
    await purchase.save();

    // Send response
    res.status(200).json(new ApiResponse(200, purchase, "Purchase approved successfully"));
});
const rejectPurchase = asyncHandler(async (req, res) => {
    const id = req.params.id; // Get purchase ID from request parameters
    // const provider_id = req.user._id; // Assuming admin authentication is in place

    // Find the purchase request
    const purchase = await Purchase.findById(id);
    if (!purchase) {
        throw new ApiError(404, "Purchase request not found");
    }

    // Ensure the purchase is pending before rejecting
    if (purchase.status !== "Pending") {
        throw new ApiError(400, "Only pending purchases can be rejected");
    }

    // Mark as rejected (Cancelled)
    purchase.status = "Cancelled";
    purchase.paymentStatus = "Failed"; // Assuming rejection means failed payment
    await purchase.save();

    // Send response
    res.status(200).json(new ApiResponse(200, purchase, "Purchase request rejected successfully"));
})



export {
    purchasePolicy, getUserPurchase, getPurchaseDetail, cancelPurchase, getAllPendingPurchases,
    approvePurchase, rejectPurchase, makePayment
};
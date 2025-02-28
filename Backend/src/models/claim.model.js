import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Policy",
        required: true
    },
    claimAmount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
}, { timestamps: true });

export const Claim = mongoose.model("Claim",claimSchema);
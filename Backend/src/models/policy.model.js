import mongoose from "mongoose"

const policySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    category: {
        type: String,
        enum: ['Health', 'Car', 'Life', 'Travel'],
        required: true,
    },
    provider: {
        type: String,
        required: true
    },
    provider_id: {
        type: String,
        required: true
    },
    premium: {
        type: Number,
        required: true
    },
    tenure: {
        type: Number,
        required: true
    },
    features: [
        { type: String }
    ],
    requiredDocuments: [
        { type: String }
    ],
    termsAndConditions: {
        type: String,
        required: true
    },

}, { timestamps: true })

export const Policy = new mongoose.model("Policy", policySchema);
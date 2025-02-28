import { Claim } from "../models/claim.model.js";
import { User } from "../models/user.model.js";
import { Policy } from "../models/policy.model.js";

// Create a new claim
export const createClaim = async (req, res) => {
    try {
        const { policyId, claimAmount, reason } = req.body;
        const userId = req.user._id; // Extracted from verifyJWT middleware
        
        // Validate policy existence
        const policy = await Policy.findById(policyId);
        if (!policy) return res.status(404).json({ message: "Policy not found" });

        // Create a new claim
        const newClaim = await Claim.create({
            userId,
            policyId,
            claimAmount,
            reason,
            status: "Pending"
        });

        res.status(201).json({ message: "Claim submitted successfully", claim: newClaim });
    } catch (error) {
        res.status(500).json({ message: "Error creating claim", error: error.message });
    }
};

// Get all claims (Admin)
export const getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.find().populate("userId policyId");
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: "Error fetching claims", error: error.message });
    }
};

// Get claims of a specific user
export const getUserClaims = async (req, res) => {
    try {
        const userId = req.user._id;
        const claims = await Claim.find({ userId }).populate("policyId");
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user claims", error: error.message });
    }
};

// Get a single claim by ID
export const getSingleClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const claim = await Claim.findById(id).populate("userId policyId");
        if (!claim) return res.status(404).json({ message: "Claim not found" });

        res.status(200).json(claim);
    } catch (error) {
        res.status(500).json({ message: "Error fetching claim", error: error.message });
    }
};

// Update claim status (Admin)
export const updateClaimStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Ensure status is valid
        const validStatuses = ["Pending", "Approved", "Rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const updatedClaim = await Claim.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedClaim) return res.status(404).json({ message: "Claim not found" });

        res.status(200).json({ message: "Claim status updated", claim: updatedClaim });
    } catch (error) {
        res.status(500).json({ message: "Error updating claim status", error: error.message });
    }
};
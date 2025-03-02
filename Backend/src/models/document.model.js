import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        encryptedContent: {
            type: String,  // Encrypted data is stored as a string
            required: true
        },
    },
    { timestamps: true }
);

const Document = mongoose.models.Document || mongoose.model("Document", DocumentSchema);
export default Document;

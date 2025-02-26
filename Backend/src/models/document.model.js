import mongoose from "mongoose"

const DocumentSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Document = mongoose.models.Document || mongoose.model("Document", DocumentSchema);
export default Document;

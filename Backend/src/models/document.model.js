import mongoose from "mongoose"

const DocumentSchema = new mongoose.Schema({
    owner: {
        type: string,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Document = mongoose.model('Document', DocumentSchema);
export default Document;

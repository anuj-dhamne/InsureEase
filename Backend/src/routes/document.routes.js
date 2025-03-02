import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { deleteDocument, getAllDocument, uploadDocument } from "../controllers/document.controller.js";

const documentRouter = Router();

// ✅ Upload document route (Ensure auth middleware runs first)
documentRouter.post(
    "/upload-document",
    verifyJWT,
    upload.fields([{ name: "document", maxCount: 1 }]),
    uploadDocument
);

// ✅ Get all documents route
documentRouter.get("/all-documents", verifyJWT, getAllDocument);

// ✅ Delete document route (Fixed function name)
documentRouter.delete("/delete-document/:id", verifyJWT, deleteDocument);


export default documentRouter;

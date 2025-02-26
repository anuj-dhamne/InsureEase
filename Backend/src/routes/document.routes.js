import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";
import { deleteDoucument, getAllDocument, uploadDocument } from "../controllers/document.controller.js";

const documentRouter=Router();

// upload document route 
documentRouter.route("/upload-document")
.post(verifyJWT,
    upload.fields([{
        name:"document",
        maxCount:1
    }]),
    uploadDocument);

// get all document rote 
documentRouter.route("/all-documents").get(verifyJWT,getAllDocument);

// delete document 
documentRouter.route("/delete-document/:id").delete(verifyJWT,deleteDoucument);

export default documentRouter;
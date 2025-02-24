import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { deleteDoucument, getAllDocument, uploadDocument } from "../controllers/document.controller.js";

const documentRouter=Router();

// upload document route 
documentRouter.route("/upload-document").post(verifyJWT,uploadDocument);

// get all document rote 
documentRouter.route("/get-documents").get(verifyJWT,getAllDocument);

// delete document 
documentRouter.route("/delete-document").delete(verifyJWT,deleteDoucument);

export default documentRouter;
import express from "express";
import multer from "multer";
import { uploadPolicy, queryPolicy,analyzePolicy } from "../controllers/policyController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"), uploadPolicy);
router.post("/query", queryPolicy);
router.post("/analyze", upload.single("file"), analyzePolicy);


export default router;

import express from "express";
import { getAIInsights } from "../controllers/aiController.js";

const router = express.Router();

router.get("/", getAIInsights);

export default router;
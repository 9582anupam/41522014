import express from "express";
const router = express.Router();
import { makeLog } from "../../controllers/logger.js";

router.post("/make-log", makeLog);

export default router;

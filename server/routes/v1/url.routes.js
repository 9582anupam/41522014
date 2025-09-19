import express from "express";
const router = express.Router();
import { shortenUrl, getOriginalUrl } from "../../controllers/url.controller.js";

router.post("/shorten", shortenUrl);
router.get("/:shortName", getOriginalUrl);

export default router;

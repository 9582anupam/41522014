import express from "express";
import urlRoutes from "./url.routes.js";

const router = express.Router();

// Attach specific routes for version 1
router.use("/url", urlRoutes);
router.use("/", (req, res) => {
    res.send("API Running");
})

export default router;

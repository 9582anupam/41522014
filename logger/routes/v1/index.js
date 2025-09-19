import express from "express";
import urlRoutes from "./logger.routes.js";

const router = express.Router();

// Attach specific routes for version 1
router.use("/logger", urlRoutes);
// router.use("/", (req, res) => {
//     res.send("API Running");
// })

export default router;

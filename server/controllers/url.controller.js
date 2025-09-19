import { Url } from "../models/url.models.js";
import { logSuccess, logError, logWarning } from "../utils/sendLogs.js";

export const shortenUrl = async (req, res) => {

    try {
        let { originalUrl, validity, shortName } = req.body;

        // basic validation
        if (!originalUrl) {
            logError("URL shortening failed: originalUrl is required", "controller");
            return res.status(400).json({ error: "originalUrl is required" });
        }

        // if validity is not provided, set it to 30 minutes from now
        if (!validity) {
            validity = 30; // default 30 minutes
        }

        // Convert validity (minutes) to expiry date
        const now = new Date();
        const expiryDate = new Date(now.getTime() + validity * 60000); // validity * 60000 (milliseconds per minute)

        if (!shortName) {
            // generate a random 6 character string for shortName
            shortName = Math.random().toString(36).substring(2, 8);
        }

        // Check if shortName already exists in the database
        const existingUrl = await Url.findOne({ shortUrl: shortName });
        if (existingUrl) {
            logWarning(`URL shortening failed: shortName '${shortName}' already exists`, "controller");
            return res.status(400).json({ error: "shortName already exists. Please choose another one." });
        }

        // Create and save the new URL mapping
        const newUrl = new Url({
            name: req.body.name || "default",
            originalUrl,
            shortUrl: shortName,
            validity: expiryDate
        });

        await newUrl.save();

        logSuccess(`URL shortened successfully: ${originalUrl} -> ${shortName}`, "controller");
        return res.status(201).json({ message: "URL shortened successfully", data: newUrl });
    } catch (error) {
        logError(`URL shortening failed: ${error.message}`, "controller");
        console.log(error);
        return res.status(500).json({ error: "Internal server errorr" });
    }
};


export const getOriginalUrl = async (req, res) => {
    try {
        const { shortName } = req.params;
        if (!shortName) {
            logError("URL retrieval failed: shortName is required", "controller");
            return res.status(400).json({ error: "shortName is required" });
        }
        const urlMapping = await Url.findOne({ shortUrl: shortName });
        if (!urlMapping) {
            logWarning(`URL retrieval failed: Short URL '${shortName}' not found`, "controller");
            return res.status(404).json({ error: "Short url not found" });
        }
        const now = new Date();
        if (urlMapping.validity < now) {
            logWarning(`URL retrieval failed: Short URL '${shortName}' has expired`, "controller");
            return res.status(410).json({ error: "This short uurl has expired" });
        }
        logSuccess(`URL retrieved successfully: ${shortName} -> ${urlMapping.originalUrl}`, "controller");
        return res.status(200).json({ originalUrl: urlMapping.originalUrl });
    } catch (error) {
        logError(`URL retrieval failed: ${error.message}`, "controller");
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
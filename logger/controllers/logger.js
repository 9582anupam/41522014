
import axios from "axios";
import { getAccessToken } from "./auth.js";

const VALID_STACKS = ["backend", "frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const BACKEND_PACKAGES = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"];
const FRONTEND_PACKAGES = ["api", "component", "hook", "page", "state", "style"];
const SHARED_PACKAGES = ["auth", "config", "middleware", "utils"];

export const makeLog = async (req, res) => {
    const { stack, level, package: packages, message } = req.body;

    // basic valdtions
    if (!VALID_STACKS.includes(stack?.toLowerCase())) {
        return res.status(400).json({ error: `stack must be: ${VALID_STACKS.join(', ')}` });
    }
    if (!VALID_LEVELS.includes(level?.toLowerCase())) {
        return res.status(400).json({ error: `level must be: ${VALID_LEVELS.join(', ')}` });
    }

    const allowedPackages = stack?.toLowerCase() === 'backend'
        ? [...BACKEND_PACKAGES, ...SHARED_PACKAGES]
        : [...FRONTEND_PACKAGES, ...SHARED_PACKAGES];

    if (!allowedPackages.includes(packages?.toLowerCase())) {
        return res.status(400).json({ error: `package must be: ${allowedPackages.join(', ')}` });
    }

    if (!message?.trim()) {
        return res.status(400).json({ error: "message is required" });
    }

    try {
        // get new access token for each request
        const tokenResult = await getAccessToken();
        if (!tokenResult.success) {
            return res.status(401).json({ error: "Failed to get access token", details: tokenResult.error });
        }

        const accessToken = tokenResult.data.access_token;

        if (!accessToken) {
            return res.status(401).json({ error: "failed to get access token", response: tokenResult.data });
        }


        // make api call with new token
        const response = await axios.post("http://20.244.56.144/evaluation-service/logs", {
            stack: stack.toLowerCase(),
            level: level.toLowerCase(),
            package: packages.toLowerCase(),
            message
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });

        res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error("Error in makeLog:", error);
        res.status(500).json({ error: error.response?.data || error.message });
    }
};
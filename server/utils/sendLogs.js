import axios from "axios";

const LOGGER_URL = process.env.LOGGER_URL || "http://logs:5001";

const sendLog = async (level, message, packageName = "server") => {
    try {
        await axios.post(`${LOGGER_URL}/api/v1/logs`, {
            stack: "backend",
            level: level,
            package: packageName,
            message: message
        });
    } catch (error) {
        console.error("Failed to send log:", error.message);
    }
};

export const logSuccess = (message, packageName) => {
    sendLog("info", message, packageName);
};

export const logError = (message, packageName) => {
    sendLog("error", message, packageName);
};

export const logWarning = (message, packageName) => {
    sendLog("warn", message, packageName);
};

export const logDebug = (message, packageName) => {
    sendLog("debug", message, packageName);
};

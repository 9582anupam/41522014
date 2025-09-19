import axios from "axios";

const LOGGER_URL = process.env.LOGGER_URL || "";

const sendLog = async (level, message, packageName = "server") => {
    try {
        await axios.post(`${LOGGER_URL}`, {
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

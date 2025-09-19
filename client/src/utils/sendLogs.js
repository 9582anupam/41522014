// Frontend logging utility
const LOGGER_URL = "http://localhost:5001"; // Logger service URL

const sendLog = async (level, message, packageName = "component") => {
    try {
        await fetch(`${LOGGER_URL}/api/v1/logger/make-log`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stack: "frontend",
                level: level,
                package: packageName,
                message: message
            })
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

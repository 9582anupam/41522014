import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const getAccessToken = async () => {
    try {
        const authData = {
            email: process.env.email || "",
            name: process.env.name || "",
            rollNo: process.env.rollNo || "",
            accessCode: process.env.accessCode || "",
            clientID: process.env.clientID || "",
            clientSecret: process.env.clientSecret || ""
        };


        const response = await axios.post("http://20.244.56.144/evaluation-service/auth", authData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        return { success: true, data: response.data };

    } catch (error) {
        return {
            success: false,
            error: error.response?.data || { message: error.message }
        };
    }
};

export const handleGetAccessToken = async (req, res) => {
    try {
        const result = await getAccessToken();

        if (result.success) {
            return res.status(200).json({
                success: true,
                message: "qccess token retrieved successfully",
                data: result.data
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "failed to get access token",
                error: result.error
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message
        });
    }
};

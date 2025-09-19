import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        originalUrl: {
            type: String,
            required: true,
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
        },
        validity: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);

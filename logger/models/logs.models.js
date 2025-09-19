import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);

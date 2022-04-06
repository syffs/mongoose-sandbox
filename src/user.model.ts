import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    email: string;
    firstName?: string;
    lastName?: string;
    external?: {
        id?: string;
    };
}

const userModel = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    external: {
        id: {
            type: String,
            unique: true,
            trim: true,
            index: true,
            sparse: true
        }
    }
});

export const User = mongoose.model<IUser & Document>("User", userModel);

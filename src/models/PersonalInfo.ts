import mongoose, { Schema, Document } from "mongoose";

interface IPersonalInfo extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
}

const PersonalInfoSchema = new Schema<IPersonalInfo>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
}, {
    timestamps: true
});

export default mongoose.models.PersonalInfo || mongoose.model<IPersonalInfo>("PersonalInfo", PersonalInfoSchema); 
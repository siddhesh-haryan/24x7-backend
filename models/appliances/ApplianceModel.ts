import mongoose, { Document, Schema } from 'mongoose';

export interface ApplianceDocument extends Document {
    name: string; // The name of the appliance
}

const applianceSchema = new Schema<ApplianceDocument>({
    name: { type: String, required: true, unique: true }, // Unique constraint
});

const Appliance = mongoose.models.Appliance || mongoose.model<ApplianceDocument>('Appliance', applianceSchema);
export default Appliance;

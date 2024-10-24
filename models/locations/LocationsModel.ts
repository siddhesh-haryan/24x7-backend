import mongoose, { Document, Schema } from 'mongoose';

export interface LocationDocument extends Document {
    name: string; // The name of the location
}

const locationSchema = new Schema<LocationDocument>({
    name: { type: String, required: true, unique: true }, // Unique constraint
});

const Location = mongoose.models.Location || mongoose.model<LocationDocument>('Location', locationSchema);
export default Location;

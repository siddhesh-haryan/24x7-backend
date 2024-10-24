import mongoose, { Document, Schema } from 'mongoose';

export interface BrandDocument extends Document {
    name: string; // The name of the brand
}

const brandSchema = new Schema<BrandDocument>({
    name: { type: String, required: true, unique: true }, // Unique constraint
});

const Brand = mongoose.models.Brand || mongoose.model<BrandDocument>('Brand', brandSchema);
export default Brand;

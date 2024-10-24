import mongoose, { Document, Schema } from 'mongoose';

// Define the structure for FAQs
interface FAQ {
    question: string; // Required question field
    answer: string; // Required answer field
}

// Define the structure for features within the component
interface Feature {
    title?: string; // Optional field
    description?: string; // Optional field
}

// Define the structure for WhyChooseUs section
interface WhyChooseUs {
    sectionHeading: string; // Required section heading
    sectionContent: string; // Required section content
    expertiseTitle: string; // Required expertise title
    expertiseDescription: string; // Required expertise description
    availabilityTitle: string; // Required availability title
    availabilityDescription: string; // Required availability description
    techniciansTitle: string; // Required technicians title
    techniciansDescription: string; // Required technicians description
}

// Define the structure for components
interface Component {
    type: string; // e.g., 'ImageOnLeft', 'ImageOnRight', 'Testimonial'
    props: { [key: string]: any }; // Use a flexible structure for props
}

// Define the main Page document structure
export interface PageDocument extends Document {
    slug?: string; // Optional slug for URL purposes
    content?: string; // Optional content field
    banner?: {
        imageUrl?: string; // Optional banner image URL
        description?: string; // Optional banner description
        alt?: string; // Optional alt text for the banner image
        title?: string; // Optional title for the banner
    };
    brandName?: string; // Optional brand name
    appliance?: string; // Optional appliance
    location?: string; // Optional location
    metaData?: {
        metaTitle?: string; // Optional metadata fields
        metaDescription?: string;
        metaKeywords?: string;
    };
    components?: Component[]; // Optional components array
    faqs?: FAQ[]; // Optional FAQs array
    whyChooseUs?: WhyChooseUs; // New optional field for WhyChooseUs section
    createdAt?: Date; // Optional createdAt field
}

// FAQ schema definition
const faqSchema = new Schema<FAQ>({
    question: { type: String, required: false }, // Required question field
    answer: { type: String, required: false }, // Required answer field
});

// Feature schema definition
const featureSchema = new Schema<Feature>({
    title: { type: String, required: false }, // Make optional
    description: { type: String, required: false }, // Make optional
});

// Component schema definition
const componentSchema = new Schema<Component>({
    type: { type: String, required: false }, // Keep required if needed
    props: { type: Schema.Types.Mixed, required: false }, // Allow any shape of props
});

// WhyChooseUs schema definition
const whyChooseUsSchema = new Schema<WhyChooseUs>({
    sectionHeading: { type: String, required: false },
    sectionContent: { type: String, required: false },
    expertiseTitle: { type: String, required: false },
    expertiseDescription: { type: String, required: false },
    availabilityTitle: { type: String, required: false },
    availabilityDescription: { type: String, required: false },
    techniciansTitle: { type: String, required: false },
    techniciansDescription: { type: String, required: false },
});

// Page schema definition
const pageSchema = new Schema<PageDocument>({
    slug: { type: String, required: true }, // Make optional
    components: [componentSchema], // Optional array of components
    metaData: {
        metaTitle: { type: String, required: false }, // Make optional
        metaDescription: { type: String, required: false }, // Make optional
        metaKeywords: { type: String, required: false }, // Make optional
    },
    brandName: { type: String, required: false }, // Make optional
    appliance: { type: String, required: false }, // Make optional
    location: { type: String, required: false }, // Make optional
    banner: {
        imageUrl: { type: String, required: false }, // Make optional
        description: { type: String, required: false }, // Make optional
        alt: { type: String, required: false }, // Make optional
        title: { type: String, required: false }, // Make optional
    },
    content: { type: String, required: false }, // Add content field
    faqs: [faqSchema], // Optional array of FAQs
    whyChooseUs: whyChooseUsSchema, // Optional field for WhyChooseUs section
    createdAt: { type: Date, default: Date.now }, // Default value
});

// Export the Page model
const Page = mongoose.models.Page || mongoose.model<PageDocument>('Page', pageSchema);
export default Page;

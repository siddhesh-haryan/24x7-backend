import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Page from './models/Page'; // Adjust the import path as needed
import Brand from './models/brands/BrandsModel'; // Import the Brand model
import Appliance from './models/appliances/ApplianceModel'; // Import the Appliance model
import Location from './models/locations/LocationsModel'; // Import the Location model

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Connect to MongoDB
const dbConnect = async () => {
  try {
    await mongoose.connect( `mongodb+srv://siddhesharyan876:siddhesh123@cluster0.7cohv.mongodb.net/cms?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// POST route for creating a page
app.post('/api/pages', async (req: Request, res: Response) => {
  await dbConnect();

  try {
    const {
      components,
      metaData,
      slug,
      brandName,
      appliance,
      location,
      banner,
      faqs,
      content,
      whyChooseUs,
    } = req.body;

    // Check and create brand if it doesn't exist
    if (brandName) {
      await Brand.findOneAndUpdate(
        { name: brandName },
        { name: brandName },
        { upsert: true, new: true },
      );
    }

    // Check and create appliance if it doesn't exist
    if (appliance) {
      await Appliance.findOneAndUpdate(
        { name: appliance },
        { name: appliance },
        { upsert: true, new: true },
      );
    }

    // Check and create location if it doesn't exist
    if (location) {
      await Location.findOneAndUpdate(
        { name: location },
        { name: location },
        { upsert: true, new: true },
      );
    }

    // Create the page
    const page = new Page({
      components,
      metaData,
      slug,
      brandName,
      appliance,
      location,
      banner,
      faqs,
      content,
      whyChooseUs,
    });

    await page.save();
    res.status(201).json(page);
  } catch (error) {
    console.error('Error creating page:', error);
    res.status(500).json({ error: 'Failed to create page' });
  }
});

// GET route for fetching pages
app.get('/api/pages', async (req: Request, res: Response) => {
  await dbConnect();

  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

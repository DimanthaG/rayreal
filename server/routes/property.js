const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middleware/auth');
const { uploadFile } = require('../utils/googleDrive'); // Import uploadFile as an object
const Property = require('../models/Property');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for files

// Add a new property
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const { name, price } = req.body;

        // Validate input
        if (!name || !price || !req.file) {
            return res.status(400).json({ message: 'Name, price, and image are required.' });
        }

        // Upload file to Google Drive
        const imageUrl = await uploadFile(req.file.path, req.file.originalname);

        // Save property data to MongoDB
        const property = new Property({ name, price, imageUrl }); // Save the public URL
        await property.save();

        res.status(201).json({ message: 'Property added successfully!', property });
    } catch (err) {
        console.error('Error adding property:', err);
        res.status(500).json({ message: 'Failed to add property.' });
    }
});

// Fetch all properties
router.get('/', authenticateToken, async (req, res) => {
  try {
      const properties = await Property.find(); // Fetch all documents
      res.json(properties); // Send properties including imageUrl
  } catch (err) {
      console.error('Error fetching properties:', err);
      res.status(500).json({ message: 'Failed to fetch properties.' });
  }
});


module.exports = router;

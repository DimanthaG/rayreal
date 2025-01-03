const express = require('express');
const axios = require('axios');

const router = express.Router();

// Proxy route to fetch images
router.get('/image-proxy', async (req, res) => {
    const { url } = req.query; // Extract the `url` parameter from the query string

    try {
        // Fetch the image using Axios
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        
        // Set the appropriate Content-Type header
        res.set('Content-Type', response.headers['content-type']);
        
        // Send the image data to the client
        res.send(response.data);
    } catch (err) {
        console.error('Error fetching image:', err.message);
        res.status(500).send('Failed to fetch image');
    }
});

module.exports = router;

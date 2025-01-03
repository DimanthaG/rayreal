const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Store public image URL
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;

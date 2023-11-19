const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    linkImage: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'products'
});

module.exports = productsSchema;
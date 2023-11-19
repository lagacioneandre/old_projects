const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    uuid: {
        type: String,
        required: true,
        trim: true
    },
    creationDate: {
        type: Date,
        required: true
    },
    expireDate: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
}, {
    collection: 'sessions'
});

module.exports = sessionSchema;
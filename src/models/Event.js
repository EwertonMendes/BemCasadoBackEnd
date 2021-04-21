const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new mongoose.Schema({
    userId: {
        type: Schema.ObjectId,
        required: true,
    },
    nubiles: [{
        firstName: String,
        lastName: String,
        nubileType: String
    }],
    guests: [{
        firstName: String,
        lastName: String,
        guestType: String
    }],
    eventDateTime: {
        type: Date,
    },
    createdDateTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Event', eventSchema);
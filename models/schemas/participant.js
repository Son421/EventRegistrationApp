var mongoose = require('mongoose');

var participantSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    informator: {
        type: String,
        required: true
    }
});

module.exports = participantSchema;
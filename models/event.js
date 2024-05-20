var mongoose = require('mongoose');
const participantSchema = require('./schemas/participant');

var eventSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    eventDate: Date,
    organize: String,
    participants: [participantSchema] 
});

module.exports = mongoose.model('events', eventSchema,'events');
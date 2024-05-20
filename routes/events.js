var express = require('express');
var router = express.Router();

router.post('/register/:eventID', async (req, res, next) => {
    var eventModel = require('../models/event');
    var participantSchema = require('../models/schemas/participant');

    var event = await eventModel.findOne({_id: req.params.eventID});

    if (event) {

        try {
            event.participants.push({
                email: "test2@mail.com",
                dateOfBirth: new Date(),
                informator: 111111
            });
        } catch (e) {
            return res.send({
                error: true,
                message: "Participant data validation error"
            });
        }
        
        return event.save().then(doc => res.send(doc)).catch(err => {
            res.send({
                error: true,
                message: err.message
            })
        });
    }

    return res.send({});
});

router.get('/list', (req, res, next) => {
    var eventModel = require('../models/event');

    eventModel.find({}).then(eventsList => res.send(JSON.stringify(eventsList)));
});

router.get('/participants-list/:eventID', (req, res, next) => {
    var eventModel = require('../models/event');

    eventModel.findOne({_id: req.params.eventID}).then(event => res.send(JSON.stringify(event.participants)));
});

router.get('/search', (req, res, next) => {
    var eventModel = require('../models/event');
    
    res.send(JSON.stringify({}));
});

module.exports = router;

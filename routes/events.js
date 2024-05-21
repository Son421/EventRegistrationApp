var express = require('express');
var router = express.Router();

router.post('/register/:eventID', async (req, res, next) => {
    var eventModel = require('../models/event');
    var participantSchema = require('../models/schemas/participant');

    var event = await eventModel.findOne({_id: req.params.eventID});

    if (event) {

        try {
            event.participants.push(req.body);
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

    let eventsList = eventModel.find({});

    if(req.query['sort']) {
        var sortingAttribute = req.query['sort'].split('-')[0];
        var sortingDirection = req.query['sort'].split('-')[1];
        var query = {};
        query[sortingAttribute] = sortingDirection
        eventsList.sort(query);
    }

    eventsList.exec().then(eventList => res.send(eventList));
});

router.get('/search-participant/:eventID', async (req, res, next) => {
    var eventModel = require('../models/event');

    var searchField = Object.keys(req.query)[0];
    var searchValue = req.query[searchField];

    var query = {};
    query[searchField] = searchValue;

    var event = await eventModel.findOne({_id: req.params.eventID}, {
        "participants": { $elemMatch: query},
        
    }).exec();
    
    if (event) {
        return res.send(event.participants[0]);
    }
    
    return res.send({
        error: true,    
        message: `No customer with such ${req.query}`
    })
});

module.exports = router;

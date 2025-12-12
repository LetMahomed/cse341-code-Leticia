const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Events'] 
    const result = await mongodb.getDatabase().db('').collection('events').find();
    result.toArray().then((events) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(events);
    });
}

const getSingle = async (req, res) => {
    //#swagger.tags = ['Events'] 
    const eventId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('').collection('events').find({_id: eventId});
    result.toArray().then((events) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(events[0]);
    });
}

const createEvent = async (req, res) => {
    //#swagger.tags = ['Events'] 
    const event = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            ownerId: req.body.ownerId,
            venueId: req.body.venueId,
            capacity: req.body.capacity,
        };
        const response = await mongodb.getDatabase().db('').collection('events').insertOne(event);
        if (response.acknowledged) {
            res.status(204).send();
        }  else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
};

const updateEvent = async (req, res) => {
    //#swagger.tags = ['Events'] 
    const eventId = new ObjectId(req.params.id);
        const event = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            ownerId: req.body.ownerId,
            venueId: req.body.venueId,
            capacity: req.body.capacity,
        };
        const response = await mongodb.getDatabase().db('').collection('events').replaceOne({ _id: eventId });
        if (response.modifiedCount > 0) {
            res.status(204).send();
        }  else {
            res.status(500).json(response.error || 'Some error occurred while updating the event.');
        }
};

const deleteEvent = async (req, res) => {
    //#swagger.tags = ['Events'] 
    const eventId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db('').collection('events').deleteOne({ _id: eventId }, true);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the event.');
        }
};


module.exports = {
    getAll,
    getSingle,
    createEvent,
    updateEvent,
    deleteEvent
};
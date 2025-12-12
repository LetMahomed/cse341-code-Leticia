const mongodb = require('../data/database');
const { get } = require('../routes');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db('').collection('events').find();
    result.toArray().then((events) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(events);
    });
}

const getSingle = async (req, res) => {
    const eventId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('').collection('events').find({_id: eventId});
    result.toArray().then((events) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(events[0]);
    });
}

module.exports = {
    getAll,
    getSingle
};
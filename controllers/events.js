const mongodb = require('../data/database');
const { get } = require('../routes');
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
    const { title, description, date, ownerId, venueId, capacity } = req.body;

    if (!title || !description || !date || !ownerId || !venueId || !capacity) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate ObjectIds
    if (!ObjectId.isValid(ownerId) || !ObjectId.isValid(venueId)) {
        return res.status(400).json({ message: "Invalid ownerId or venueId" });
    }

    // Validate date
    if (isNaN(new Date(date))) {
        return res.status(400).json({ message: "Invalid date" });
    }

    const event = {
        title,
        description,
        date: new Date(date),
        ownerId: new ObjectId(ownerId),
        venueId: new ObjectId(venueId),
        capacity: Number(capacity),
    };

    const result = await db.collection('events').insertOne(event);
    res.status(201).json(result);
};

const updateEvent = async (req, res) => {
    //#swagger.tags = ['Events'] 
    const eventId = req.params.id;

    if (!ObjectId.isValid(eventId)) return res.status(400).json({ message: "Invalid event ID" });

    const updateFields = {};
    ['title', 'description', 'date', 'ownerId', 'venueId', 'capacity'].forEach(field => {
        if (req.body[field] !== undefined) updateFields[field] = req.body[field];
    });

    if (updateFields.date) updateFields.date = new Date(updateFields.date);
    if (updateFields.ownerId) updateFields.ownerId = new ObjectId(updateFields.ownerId);
    if (updateFields.venueId) updateFields.venueId = new ObjectId(updateFields.venueId);
    if (updateFields.capacity) updateFields.capacity = Number(updateFields.capacity);

    const result = await db.collection('events').updateOne(
        { _id: new ObjectId(eventId) },
        { $set: updateFields }
    );

    if (result.matchedCount > 0) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event updated" });
};

const deleteEvent = async (req, res) => {
    //#swagger.tags = ['Events'] 
    const eventId = req.params.id;

    if (!ObjectId.isValid(eventId)) return res.status(400).json({ message: "Invalid event ID" });

    const result = await db.collection('events').deleteOne({ _id: new ObjectId(eventId) });

    if (result.deletedCount > 0) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event deleted" });
};


module.exports = {
    getAll,
    getSingle,
    createEvent,
    updateEvent,
    deleteEvent
};
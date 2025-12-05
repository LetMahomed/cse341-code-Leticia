const Event = require("../models/event");

// GET all events
exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

// GET event by ID
exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ error: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

// POST create event
exports.createEvent = async (req, res, next) => {
  try {
    const { title, date, location } = req.body;

    if (!title || !date || !location)
      return res.status(400).json({ error: "title, date, and location are required" });

    const event = new Event({ title, date, location });
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    next(err);
  }
};

// PUT update event
exports.updateEvent = async (req, res, next) => {
  try {
    const { title, date, location } = req.body;

    if (!title || !date || !location)
      return res.status(400).json({ error: "title, date, and location are required" });

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { title, date, location },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Event not found" });

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE event
exports.deleteEvent = async (req, res, next) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ error: "Event not found" });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

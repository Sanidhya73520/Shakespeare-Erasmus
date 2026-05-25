const Event = require('../models/Event');

exports.getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find().sort({ startTime: 1 });
    res.json({ success: true, data: { events } });
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

exports.searchEvents = async (req, res, next) => {
  try {
    const q = req.body.query || '';
    const events = await Event.find({ $text: { $search: q } });
    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

exports.getEventsByCategory = async (req, res, next) => {
  try {
    const events = await Event.find({ category: req.params.category });
    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

exports.registerEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, { $inc: { registered: 1 } }, { new: true });
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

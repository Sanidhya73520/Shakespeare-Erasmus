const Journey = require('../models/Journey');

exports.createJourney = async (req, res, next) => {
  try {
    const journey = new Journey({ sessionId: req.body.sessionId });
    await journey.save();
    res.status(201).json({ success: true, data: journey });
  } catch (err) {
    if (err.code === 11000) {
      // Return existing journey
      const journey = await Journey.findOne({ sessionId: req.body.sessionId });
      return res.status(200).json({ success: true, data: journey });
    }
    next(err);
  }
};

exports.getJourney = async (req, res, next) => {
  try {
    const journey = await Journey.findOne({ sessionId: req.params.sessionId });
    if (!journey) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true, data: journey });
  } catch (err) {
    next(err);
  }
};

exports.updateJourney = async (req, res, next) => {
  try {
    const journey = await Journey.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { $set: req.body },
      { new: true }
    );
    res.json({ success: true, data: journey });
  } catch (err) {
    next(err);
  }
};

exports.completeJourney = async (req, res, next) => {
  try {
    const journey = await Journey.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { completedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, data: journey });
  } catch (err) {
    next(err);
  }
};

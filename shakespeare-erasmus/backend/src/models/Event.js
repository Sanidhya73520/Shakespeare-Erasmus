const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    enum: ['play', 'workshop', 'talk', 'exhibition'],
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  venue: String,
  location: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  image: String,
  thumbnail: String,
  status: {
    type: String,
    enum: ['live', 'starting_soon', 'tomorrow', 'upcoming', 'finished'],
    default: 'upcoming'
  },
  attendees: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  registrationLink: String,
  speakers: [{
    name: String,
    role: String,
    image: String
  }],
  capacity: Number,
  registered: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

eventSchema.index({ category: 1, startTime: -1 });
eventSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Event', eventSchema);

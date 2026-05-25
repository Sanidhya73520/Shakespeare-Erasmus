const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
  planterName: {
    type: String,
    required: true,
    maxlength: 50
  },
  message: {
    type: String,
    required: true,
    maxlength: 200
  },
  flowerType: {
    type: String,
    enum: ['rose', 'lily', 'sunflower', 'lotus', 'tulip', 'iris', 'daisy', 'orchid', 'peony', 'lavender'],
    required: true
  },
  plantedAt: {
    type: Date,
    default: Date.now
  },
  sessionId: String, // Link to user journey
  userId: mongoose.Schema.Types.ObjectId, // Optional - for logged-in users
  ipAddress: String, // For anonymous tracking
  location: {
    type: {
      latitude: Number,
      longitude: Number
    },
    default: null
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  metadata: {
    userAgent: String,
    referrer: String
  }
}, { timestamps: true });

// Index for search and sorting
flowerSchema.index({ planterName: 'text', message: 'text' });
flowerSchema.index({ plantedAt: -1 });
flowerSchema.index({ flowerType: 1 });

module.exports = mongoose.model('Flower', flowerSchema);

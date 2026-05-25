const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  sessionId: {
    type: String,
    unique: true,
    required: true
  },
  userId: mongoose.Schema.Types.ObjectId,
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  experiences: {
    discoverYourself: {
      completed: { type: Boolean, default: false },
      characterMatched: String,
      answers: [String],
      completedAt: Date
    },
    meetTheCharacter: {
      completed: { type: Boolean, default: false },
      selectedCharacter: String,
      selectedEmotions: [String],
      completedAt: Date
    },
    discoverEvents: {
      completed: { type: Boolean, default: false },
      eventsViewed: [String],
      eventCategory: String,
      completedAt: Date
    },
    plantYourLegacy: {
      completed: { type: Boolean, default: false },
      planterName: String,
      message: String,
      flowerType: String,
      flowerId: mongoose.Schema.Types.ObjectId,
      completedAt: Date
    },
    exploreWorld: {
      completed: { type: Boolean, default: false },
      countriesVisited: [String],
      completedAt: Date
    }
  },
  stats: {
    totalExperiences: { type: Number, default: 0 },
    totalQuestionsAnswered: { type: Number, default: 0 },
    totalFlowersPlanted: { type: Number, default: 0 },
    totalCountriesExplored: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 } // in seconds
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    language: String,
    referrer: String
  }
}, { timestamps: true });

journeySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Journey', journeySchema);

const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  flag: String,
  title: String,
  role: String,
  costume: String,
  background: String,
  quote: String,
  traits: [String],
  topics: [String],
  colors: [String],
  modelSrc: String,
  emoteFolder: String,
  emotes: [mongoose.Schema.Types.Mixed]
}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);

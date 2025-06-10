const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  watched: { type: Boolean, default: false }
});

module.exports = mongoose.model('Movie', MovieSchema);

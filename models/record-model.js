const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  genre: { type: String, required: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
  year: { type: Number, required: false },
});

module.exports = mongoose.model("Record", RecordSchema);

const mongoose = require("mongoose");

const RecordSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: false },
  year: { type: Number, required: false },
  cover: {
    type: String,
  },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Record", RecordSchema);

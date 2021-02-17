const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  band: { type: String, required: true },
  titel: { type: String, required: true },
  jahr: { type: Number, required: false },
});

module.exports = mongoose.model("Order", OrderSchema);

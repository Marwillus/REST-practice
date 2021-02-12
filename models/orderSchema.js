const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  record: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Record",
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Order", orderSchema);

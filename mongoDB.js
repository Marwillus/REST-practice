const mongoose = require("mongoose");

const uri = process.env.mongo || "mongodb://localhost:27017/music-store";
const params = { useNewUrlParser: true, useUnifiedTopology: true };

const connectDB = () => {
  mongoose
    .connect(uri, params)
    .then(() => {
      console.log("MongoDB ist verbunden");
    })
    .catch((err) => console.log("Fehler beim verbinden der DB ", err));
};

module.exports = connectDB;
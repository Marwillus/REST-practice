const mongoose = require("mongoose");

const uri = process.env.mongo || "mongodb://localhost:27017/music-store";
const params = { useNewUrlParser: true, useUnifiedTopology: true };

const connectDB = () =>{
  mongoose.connect(uri,params).then(()=>console.log('MongoDB ist connected')).catch((err)=>console.log('Es gab Fehler beim connecten: '+ err))
}

module.exports = connectDB
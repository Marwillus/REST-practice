const faker = require("faker");
const mongoose = require("mongoose");

const RecordSchema = require("./models/record-model");

console.log("Datenbank wird befuellt");

const connectMongo = require("./mongoDB");
connectMongo();

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Verbindungsfehler:"));
db.once("open", () => {
  console.log("mit MongoDB verbunden");

  RecordSchema.deleteMany({})
    .then(() => console.log("alle records geloescht"))
    .catch((err) => console.log(err));

  const randomRecords = [];
  for (let index = 0; index < 5; index++) {
    let album = {
      _id: new mongoose.Types.ObjectId(),
      artist: faker.name.firstName(),
      title: faker.company.companyName(),
      genre: faker.music.genre(),
      year: faker.random.number({
        min: 1950,
        max: 2020,
      }),
    };
    randomRecords.push(album);
  }

  const savePromise = randomRecords.map((album) => RecordSchema.create(album));

  Promise.all(savePromise)
    .then((result) => {
      console.log(result);
      console.log("Erfolgreich gespeichert");
      db.close();
      console.log("Verbindung getrennt");
    })
    .catch((err) => console.log(err));
});

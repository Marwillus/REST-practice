/* Router für meine Musikaufnahmen. Basis Pfad /records/ (aus App.js) */
const express = require("express");
const router = express.Router();

const {
  recordsGetAllController,
  recordsPostController,
  recordsPutController,
  recordsDeleteController,
  recordsGetOneController,
} = require("../controller/records-controller");
const auth = require("../middleware/auth");

// Verkürzte Schreibweise,
// mehrere Methoden (GET/POST) für einen Endpunkt.
router
  .route("/")
  .get(recordsGetAllController)
  .post(auth, recordsPostController);

router
  // Hier definieren wir ein Stück Route mit Parameter.
  // das nächste URL Segment nach /router/ wird in einen Parameter namens id eingelesen
  .route("/:id")
  .get(recordsGetOneController)
  .put(auth, recordsPutController)
  .delete(auth, recordsDeleteController);

module.exports = router;

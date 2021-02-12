var express = require("express");
var router = express.Router();
//for image-upload
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  recordGetAll,
  recordPost,
  recordPutOne,
  recordDeleteOne,
  recordGetOne,
} = require("../controller/recordsController");

/* GET users listing. */
router.route("/").get(recordGetAll).post(upload.single("cover"), recordPost);

router
  .route("/:id")
  .get(recordGetOne)
  .put(recordPutOne)
  .delete(recordDeleteOne);

module.exports = router;

var express = require("express");
var router = express.Router();

const {
  recordGetAll,
  recordPost,
  recordPutOne,
  recordDeleteOne,
  recordGetOne,
} = require("../controller/recordsController");

/* GET users listing. */
router.route("/").get(recordGetAll).post(recordPost);

router
  .route("/:id")
  .get(recordGetOne)
  .put(recordPutOne)
  .delete(recordDeleteOne);

module.exports = router;

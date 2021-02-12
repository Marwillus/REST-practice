var express = require("express");
var router = express.Router();

const {
  userGetAll,
  userPutOne,
  userDeleteOne,
} = require("../controller/usersController");

router.route("/").get(userGetAll);

router.route("/:id").put(userPutOne).delete(userDeleteOne);

module.exports = router;

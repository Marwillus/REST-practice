var express = require("express");
var router = express.Router();

const {
  orderGetAll,
  orderPost,
  orderGetOne,
  orderPutOne,
  orderDeleteOne,
} = require("../controller/orderController");

/* GET users listing. */
router.route("/").get(orderGetAll).post(orderPost);

router.route("/:id").get(orderGetOne).put(orderPutOne).delete(orderDeleteOne);

module.exports = router;

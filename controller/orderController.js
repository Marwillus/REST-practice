const mongoose = require("mongoose");
const Order = require("../models/orderSchema");

exports.orderGetAll = (req, res, next) => {
  Order.find()
    .populate("product", "title _id")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      next(err);
    });
};

exports.orderGetOne = (req, res, next) => {
  const { id } = req.params;
  Order.findOne({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.orderPost = (req, res, next) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId,
  });
  album
    .save()
    .then((order) => {
      res.status(201).send({
        msg: "order send",
        order: order,
      });
    })
    .catch((err) => {
      next(err);
    });
};

exports.orderPutOne = (req, res, next) => {
  const { id } = req.params;
  Order.updateOne(id, (err, result) => {
    if (err) {
      res.status(500).send("PUT didnt work " + err);
    } else {
      res.status(200).send(result);
    }
  });
};

exports.orderDeleteOne = (req, res, next) => {
  const { id } = req.params;
  Order.deleteOne({ id }, (err, result) => {
    if (err) {
      next(err);
    } else {
      res.status(200).send(result);
    }
  });
};

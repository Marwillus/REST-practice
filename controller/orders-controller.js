const Order = require("../models/order-model");

exports.ordersGetAllController = (req, res, next) => {
  //res.send('ich zeige alle Bestellungen des Ladens als Array');
  const bestellungen = Orders.find();
  res.status(200).send(bestellungen);
};

exports.ordersPostController = async (req, res, next) => {
  //res.send("Eine neue Bestellung speichern.")
  try {
    const bestellung = req.body;
    const newOrder = await Order.create(bestellung);
    res.status(200).send(bestellung);
  } catch (err) {
    next(err);
  }
};

exports.ordersGetOneController = async (req, res, next) => {
  try {
    const bestellung = req.body;
    const order = Order.findById(bestellung._id);
    res.status(200).send(order);
  } catch (err) {
    next(err);
  }
};

exports.ordersPutController = async (req, res, next) => {
  try {
    const bestellung = req.body;
    const updateOrder = await Order.findOneAndUpdate({ _id: bestellung._id });
    res.status(200).send(updateOrder);
  } catch (err) {
    next(err);
  }
};

exports.ordersDeleteController = async (req, res, next) => {
  try {
    const bestellung = req.body;
    console.log("Body: ", req.body);
    const delOrder = await Order.findByIdAndRemove({ _id: bestellung._id });
    res.status(200).send("delete complete" + delOrder);
  } catch (err) {
    next(err);
  }
};

//module.exports = { ordersGetAllController, ordersPostController, ordersGetOneController, ordersPutController, ordersDeleteController };

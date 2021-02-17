// Vereinheitlicht Datenbank
const db = require("../db.js");

exports.ordersGetAllController = (req, res, next) => {
  //res.send('ich zeige alle Bestellungen des Ladens als Array');
  const bestellungen = db.get("orders").value();
  res.status(200).send(bestellungen);
};

exports.ordersPostController = (req, res, next) => {
  //res.send("Eine neue Bestellung speichern.")
  const bestellung = req.body;
  console.log("Body: ", req.body);
  db.get("orders")
    .push(bestellung)
    .last()
    .assign({ id: Date.now().toString() })
    .write();
  res.status(200).send(bestellung);
};

exports.ordersGetOneController = (req, res, next) => {
  // id aus dem URL-Segment über destrukturierung rausholen.
  const { id } = req.params;
  //res.send('gebe nur das eine Bestellung zurück mit ID:' + id);
  const bestellung = db.get("orders").find({ id });
  res.status(200).send(bestellung);
};

exports.ordersPutController = (req, res, next) => {
  // das Segment nach /orders/ ist meine ID zum ändern
  // z.b: localhost:3001/orders/1235 => req.params.id = 1235

  // id aus dem URL-Segment über destrukturierung rausholen.
  const { id } = req.params;
  const neueWerte = req.body;
  const bestellung = db.get("orders").find({ id }).assign(neueWerte).write();
  res.status(200).send(bestellung);
  //	res.send('ich ändere die Bestellung mit ID:' + id);
};

exports.ordersDeleteController = (req, res, next) => {
  const { id } = req.params;
  //res.send('ich lösche die Bestellung mit ID:' + id);

  const order = db.get("orders").remove({ id }).write();
  res.status(200).send(order);
};

//module.exports = { ordersGetAllController, ordersPostController, ordersGetOneController, ordersPutController, ordersDeleteController };

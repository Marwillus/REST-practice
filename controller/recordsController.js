const mongoose = require("mongoose");
const Record = require("../models/recordSchema");

exports.recordGetAll = (req, res, next) => {
  Record.find()
    .then((result) => {
      const response = {
        count: result.length,
        products: result.map((item) => {
          return {
            _id: item._id,
            title: item.title,
            artist: item.artist,
            price: item.price,
            url: {
              type: "GET",
              url: "http://localhost:3000/records/" + item._id,
            },
          };
        }),
      };
      res.status(200).send(response);
    })
    .catch((err) => {
      next(err);
    });
};

exports.recordGetOne = (req, res, next) => {
  const { id } = req.params;
  Record.findOne({ _id: id })
    .then((result) => {
      if (result) {
        res.status(200).send({
          record: result,
          request: {
            type: "GET",
            description: "get all Records",
            url: "http://localhost/records",
          },
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.recordPost = (req, res, next) => {
  const album = new Record({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    artist: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
    image: req.body.image,
    price: req.body.price,
  });
  album
    .save()
    .then((record) => {
      res.status(201).send({
        msg: "record created",
        record: record,
        request: {
          type: "GET",
          url: "http://localhost:3000/records/" + record._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("POST didnt work " + err);
    });
};

exports.recordPutOne = (req, res, next) => {
  const { id } = req.params;
  Record.updateOne(id, (err, result) => {
    if (err) {
      res.status(500).send("PUT didnt work " + err);
    } else {
      res.status(200).send(result);
    }
  });
};

exports.recordDeleteOne = (req, res, next) => {
  const { id } = req.params;
  Record.deleteOne({ id }, (err, result) => {
    if (err) {
      res.status(500).send("DELETE didnt work " + err);
    } else {
      res.status(200).send(result);
    }
  });
};

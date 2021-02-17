const Record = require("../models/record-model");
const mongoose = require("mongoose");

exports.recordsGetAllController = async (req, res, next) => {
  try {
    const record = await Record.find();
    res.status(200).send(record);
  } catch (err) {
    next(err);
  }
};

exports.recordsPostController = async (req, res, next) => {
  try {
    if (req.tokenUser.isAdmin === false) {
      return res.status(401).send("access only for admin");
    }
    const record = await Record.create(req.body);
    res.status(201).json({
      message: "record succesfully created",
      createdProduct: record,
      request: {
        type: "GET",
        url: process.env.URL + record._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.recordsGetOneController = (req, res, next) => {
  // das Segment nach /records/ ist meine ID zum ändern
  const { id } = req.params;
  Record.findById(id, (err, result) => {
    if (err) {
      res.status(500).send("Something went wrong: " + err);
    }
    res.status(201).send(result);
  });
};

exports.recordsPutController = (req, res, next) => {
  if (req.tokenUser.isAdmin === false) {
    return res.status(401).send("access only for admin");
  }
  const { id } = req.params;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Record.updateOne(id, { $set: updateOps }, (err, result) => {
    if (err) {
      res.status(500).send("Something went wrong: " + err);
    }
    res.status(200).json(result);
  });
};

exports.recordsDeleteController = async (req, res, next) => {
  try {
    //check if admin
    if (req.tokenUser.isAdmin === false) {
      return res.status(401).send("access only for admin");
    }

    const { id } = req.params;
    const record = await Record.remove({ _id: id });
    if (record.deleteCount > 0) {
      res.status(200).send({
        msg: "file deleted",
        record: record,
      });
    } else {
      res.status(404).send("couldn't find file");
    }
  } catch (err) {
    next(err);
  }
};

const User = require("../models/userSchema");

exports.userGetAll = (req, res, next) => {
  User.find()
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      console.log(err);
      res.status(500).send("GET didnt work " + err);
    });
};

exports.userPutOne = (req, res, next) => {
  const { id } = req.params;
  User.updateOne(id, (err, result) => {
    if (err) {
      res.status(500).send("PUT didnt work " + err);
    } else {
      res.status(200).send(result);
    }
  });
};

exports.userDeleteOne = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne(id, (err, result) => {
    if (err) {
      res.status(500).send("DELETE didnt work " + err);
    } else {
      res.status(200).send(result);
    }
  });
};

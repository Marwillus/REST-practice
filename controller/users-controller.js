// Vereinheitlicht Datenbank
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/user-model");

// für GET /user
exports.getAll = (req, res, next) => {
  if (req.tokenUser.isAdmin === false) {
    return res.status(401).send("access only for admin");
  }
  const users = User.find();
  res.status(200).send(users);
};

// für POST /user
exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        validationError: errors.array(),
      });
    }
    const newUser = await User.find({ email: req.body.email });
    if (newUser.length >= 1) {
      return res.status(422).send({
        msg: "email aready in the db",
      });
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hash,
        admin: req.body.admin,
      });
      user
        .save()
        .then((doc) => res.status(201).send(doc))
        .catch((err) => next(err));
    });
  } catch (error) {
    next(error);
  }
};

// für GET /user/:nutzerID
exports.getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getUser = await User.findById(id);

    if (id !== req.tokenUser.userId) {
      return status(401).send("u're not allowed to do that");
    }
    if (getUser === null) {
      res.status(404).send({
        msg: "User not found",
      });
    } else {
      res.status(200).send({
        msg: "request succesfull",
        user: getUser,
      });
    }
  } catch (err) {
    next(err);
  }
};

// für PUT /user/:nutzerID
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (id !== req.tokenUser.id) {
      return res.status(401).send("U got no rights here");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        //express-validierung
        validationError: errors.array(),
      });
    }

    if (req.body.passwort) {
      let hashPassword = await bcrypt.hash(req.body.passwort, 10);
      let updatedUser = await User.findOneAndUpdate(
        { id },
        { ...req.body, passwort: hashPassword }
      );
      return res.status(200).send({
        msg: "User succesfully updated",
        user: updatedUser,
        request: {
          type: "PUT",
          url: "http://localhost:3001/user/",
        },
      });
    } else {
      let updatedUser = await User.findOneAndUpdate({ id }, req.body, {
        new: true,
        upsert: true,
      });
      return res.status(200).send({
        msg: "User succesfully updated",
        user: updatedUser,
        request: {
          type: "PUT",
          url: "http://localhost:3001/user/",
        },
      });
    }
  } catch (error) {
    res.status(500).send({ msg: "Update lief schief!", error: error });
  }
};

// für DELETE /user/:nutzerID
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id !== req.tokenUser.id) {
      return res.status(401).send("U got no rights here");
    }
    const user = await User.remove({ _id: id });
    if (user.deleteCount > 0) {
      res.status(200).send({
        msg: "file deleted",
        user: user,
      });
    } else {
      res.status(404).send("couldnt find file");
    }
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = req.body;

    const userDb = await User.findOne({ email: user.email });
    if (userDb === null) {
      return res.status(409).send("this email don't exist");
    }
    const comparePassword = await bcrypt.compare(
      user.password,
      userDb.password
    );
    if (comparePassword) {
      const token = jwt.sign(
        {
          email: userDb.email,
          userId: userDb._id,
          isAdmin: userDb.admin,
        },
        process.env.JWT || "secret",
        { expiresIn: "5h" }
      );
      return res.status(200).send({
        msg: "login successfull",
        token: token,
      });
    }
  } catch {
    (err) => res.send(409).send("login failed");
  }
};

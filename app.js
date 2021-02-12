//import express
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");

var app = express();

//init MongoDB
const connectDB = require("./initMongo");
connectDB();

//setup express
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

//Routen
// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/records", recordsRouter);

//Fehlerbehandlung
app.get("*", (req, res, next) => {
  const error = createError(404, "Dieser Pfad exzestiert nicht");
  next(error);
});
app.use((err, req, res, next) => {
  console.log("Die Fehlermiddleware sagt: " + err);
  res.status(err.statusCode);
  res.send({
    error: {
      status: err.statusCode,
      msg: err.message,
    },
  });
});

module.exports = app;

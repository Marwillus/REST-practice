/** Externe Abhängigkeiten */
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/** Import für die Datenbank vereinheitlicht */
// const db = require("./db.js");

//mongoose setup
const connectMongo = require("./mongoDB");
connectMongo();

/** Routen */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const recordsRouter = require("./routes/records");
const orderRouter = require("./routes/orders");

// error handling
const { missingPath, errorResponse } = require("./errorHandling");

/** Initialisierung */
const app = express();

/** Protokollierung aus NPM-Paket morgan */
app.use(logger("dev"));

/** Standard-Anfrage (Request) Parser von Express */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Bevor ich die Routen-Middlewares hinzufüge,
// packe ich die CORS Header via Middleware in jede Antwort (response).
const corsHeader = require("./middleware/cors");
app.use(corsHeader);

/** Statisch ausgelieferte Dateien */
app.use(express.static(path.join(__dirname, "public")));

/** Routen */
app.use("/", indexRouter);
// Nutzer / Aufnahmen / Bestellungen
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/orders", orderRouter);

//errors
app.get("*", missingPath);
app.use(errorResponse);

/** Export */
module.exports = app;

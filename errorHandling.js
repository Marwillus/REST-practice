const missingPath = (req, res, next) => {
  // Fehler werfen:
  let fehler = new Error("Diesen Pfad gibt es nicht");
  fehler.statusCode = 404;
  // FEHLER EXTRA: wir können fehler-Objekte auch mit dem Paket http-errors erstellen:
  const fehlerKurz = createError(404, "Diesen Pfad gibt es nicht");

  // weitergeben an nächster Middleware
  next(fehlerKurz);
};

const errorResponse = (error, req, res, next) => {
  console.log("Unser FehlerMiddleware", error);
  res.status(error.statusCode || 500);
  res.send({
    error: {
      status: error.statusCode,
      mitteilung: error.message,
    },
  });
};

module.exports = { missingPath, errorResponse };

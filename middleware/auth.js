const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    const verifiedToken = jwt.verify(token, process.env.JWT || "secret");
    req.tokenUser = verifiedToken;
    // console.log(verifiedToken);
    next();
  } catch (err) {
    res
      .status(401)
      .send({ msg: "Authentifizierung fehlgeschlagen", error: err });
  }
};

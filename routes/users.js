const express = require("express");
const router = express.Router();

//validierungspacket von express
const { check } = require("express-validator");

const {
  getAll,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controller/users-controller");

//authentification
const auth = require("../middleware/auth");

const validateUser = [
  check("name").notEmpty().withMessage("name required"),
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("this is no valid email"),
];

//routen
router.route("/").get(auth, getAll).post(validateUser, createUser);

router
  .route("/:id")
  .get(auth, getOneUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

router.route("/login").post(loginUser);

module.exports = router;

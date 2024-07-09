const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

router.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome to the system" });
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;

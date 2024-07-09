const express = require("express");
const passport = require("./passport"); // adjust path as per your setup

const router = express.Router();

router.post("/login", passport.authenticate("local"), (req, res) => {
  // Successful authentication, redirect or respond with a success message
  res.json({ message: "Login successful" });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout successful" });
});

module.exports = router;

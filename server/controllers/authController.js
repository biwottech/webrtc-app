const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password: password,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.includePasswordTemporarily();

    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

module.exports = generateToken;

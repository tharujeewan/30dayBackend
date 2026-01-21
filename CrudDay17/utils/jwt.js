const jwt = require('jsonwebtoken');
require('dotenv').config();

const signToken = (payload) => {
  // Generate a JWT token valid for 1 hour
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { signToken, verifyToken };

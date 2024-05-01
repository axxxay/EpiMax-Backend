const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(id) {
  return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30d' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

module.exports = { generateAccessToken, verifyToken };

const jwt = require("jsonwebtoken");
const assertions = require("./assertions");

async function generateToken(username) {
  const token = await jwt.sign(username, process.env.TOKEN_KEY, {
    expiresIn: "1h"
  });
  return token;
}

async function verifyToken(token) {
  const username = jwt.verify(token, process.env.TOKEN_KEY);
  const user = assertions.checkUserExists(username);
  if (!user) return null;
  return user;
}

module.exports = {
  generateToken,
  verifyToken
};

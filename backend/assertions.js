const db = require("./database");

async function checkUserExists(username) {
  const [rows] = await db
    .promise()
    .execute("SELECT username FROM users WHERE username = ?", [username]);
  if (rows.length > 0) return rows[0];
  else return null;
}

module.exports = {
  checkUserExists
};

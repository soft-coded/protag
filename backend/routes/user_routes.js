const router = require("express").Router();

const tknHndlr = require("../token_handler");
const assertions = require("../assertions");
const db = require("../database");

router.use(async (req, res, next) => {
  if (req.method === "OPTIONS") return next();
  const token = req.headers.authorization.split(" ")[1]; // Bearer TOKEN
  try {
    const user = await tknHndlr.verifyToken(token);
    if (!user || !token)
      return res.status(403).json({ message: "User is not logged in." });
    else next();
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

// I am just mocking these up
router.get("/:username/orders", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await assertions.checkUserExists(username);
    if (!user) return res.status(403).json({ message: "User does not exist." });
    // Orders is a JSON value in the database
    const [orders] = await db
      .promise()
      .execute("SELECT orders FROM orders WHERE username = ?", [user.username]);
    res.json({ message: "Orders by " + username, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;

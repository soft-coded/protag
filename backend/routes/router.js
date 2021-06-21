const router = require("express").Router();
const db = require("../database");
const assertions = require("../assertions");

router.post("/login", async (req, res) => {
  try {
    const user = await assertions.checkUserExists(req.body.username);
    if (user) return res.json({ message: "User exists already." });
    else res.send({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

router.post("/checkusername", async (req, res) => {
  try {
    const user = await assertions.checkUserExists(req.body.username);
    if (user) return res.json({ exists: true });
    else res.send({ exists: false });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  // can do all the checks here
  const { username, name, password, address, phoneNumber, email } = req.body;
  try {
    const exists = await assertions.checkUserExists(username);
    // console.log(exists);
    if (exists) return res.json({ message: "User already exists." });
    else {
      db.execute(
        "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?)",
        [username, name, email, password, address, phoneNumber],
        err => {
          if (err) return res.status(500).json({ message: err.message });
          res.send({ message: "User created successfully.", username });
        }
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;

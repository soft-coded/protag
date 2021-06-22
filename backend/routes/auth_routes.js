const router = require("express").Router();
const bcrypt = require("bcryptjs");

const db = require("../database");
const assertions = require("../assertions");
const tknHndlr = require("../token_handler");

router.post("/login", async (req, res) => {
  try {
    const user = await assertions.checkUserExists(req.body.username);
    if (user) return res.json({ message: "User exists already." });
    else {
      const passMatches = bcrypt.compareSync(req.body.password, user.password);
      if (!passMatches)
        return res.status(403).json({ message: "Incorrect password" });
      const token = await tknHndlr.generateToken(user.username);
      res.send({
        username: user.username,
        message: "Logged in successfully.",
        token
      });
    }
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
  // can do all the checks here, but I am not doing them
  const { username, name, password, address, phoneNumber, email } = req.body;
  try {
    const exists = await assertions.checkUserExists(username);
    if (exists) return res.json({ message: "User already exists." });
    else {
      const hash = bcrypt.hashSync(password, 12);
      const token = await tknHndlr.generateToken(username);
      db.execute(
        "INSERT INTO users VALUES(?, ?, ?, ?, ?, ?)",
        [username, name, email, hash, address, phoneNumber],
        err => {
          if (err) return res.status(500).json({ message: err.message });
          res.send({ message: "User created successfully.", username, token });
        }
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;

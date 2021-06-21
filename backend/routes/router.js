const router = require("express").Router();

router.post("/login", (req, res) => {
  res.json({ username: req.body.username });
});

router.post("/checkusername", (req, res) => {
  res.json({ exists: false });
});

router.post("/signup", (req, res) => {
  res.json({ username: req.body.username });
});

module.exports = router;

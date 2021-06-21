const express = require("express");

const router = require("./routes/router");

const app = express();
app.use(express.json());
// CORS setup
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/", router);

app.use((_, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(5000);

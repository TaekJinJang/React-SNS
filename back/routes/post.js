const express = require("express");

const router = express.Router();

app.get("/", (req, res) => {
  // POST - /post
  res.json([{ id: 1, content: "hello" }]);
});
app.post("/", (req, res) => {
  // DELETE - /delete
  res.send("helo express");
});

module.exports = router;

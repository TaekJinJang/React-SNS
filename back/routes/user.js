const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // POST - /post
  res.json([{ id: 1, content: "hello" }]);
});
router.post("/", (req, res) => {
  // DELETE - /delete
  res.send("helo express");
});

module.exports = router;

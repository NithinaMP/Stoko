const express = require("express");
const router = express.Router();
const authMW = require("../middlewares/auth.middleware");

// simple create home stub - real implementation can be extended
router.post("/create", authMW, async (req, res) => {
  res.json({ message: "create home endpoint - implement later" });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.controller");
const authMW = require("../middlewares/auth.middleware");

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.get("/me", authMW, authCtrl.me);

module.exports = router;

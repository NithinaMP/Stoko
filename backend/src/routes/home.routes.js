const express = require("express");
const router = express.Router();
const homeCtrl = require("../controllers/home.controller");
const authMW = require("../middlewares/auth.middleware");

router.post("/create", authMW, homeCtrl.createHome);
router.get("/my-homes", authMW, homeCtrl.getMyHomes);
router.post("/invite", authMW, homeCtrl.inviteMember);
router.get("/members", authMW, homeCtrl.getMembers);

module.exports = router;
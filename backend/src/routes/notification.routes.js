const express = require("express");
const router = express.Router();
const notifCtrl = require("../controllers/notification.controller");
const authMW = require("../middlewares/auth.middleware");

router.get("/", authMW, notifCtrl.getNotifications);
router.delete("/:id", authMW, notifCtrl.markAsRead);

module.exports = router;
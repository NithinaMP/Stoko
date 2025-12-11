const express = require("express");
const router = express.Router();
const itemCtrl = require("../controllers/item.controller");
const authMW = require("../middlewares/auth.middleware");

router.post("/add", authMW, itemCtrl.addItem);
router.get("/all", authMW, itemCtrl.listItems);
router.put("/update/:id", authMW, itemCtrl.updateItem);
router.delete("/:id", authMW, itemCtrl.deleteItem);

module.exports = router;

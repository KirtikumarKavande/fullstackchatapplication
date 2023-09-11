const messageModel = require("../models/messsages");

const message = require("../controllers/messageController");
const auth = require("../middleware/auth");

const express = require("express");

const router = express.Router();

router.post("/savemessage", auth.authenticate, message.saveMessage);
router.get("/showmessage", auth.authenticate, message.showMessage);


module.exports = router;

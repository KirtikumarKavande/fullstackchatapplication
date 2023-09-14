const express = require("express");

const groupModel = require("../models/groups");

const group = require("../controllers/groupController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/creategroup", auth.authenticate, group.createUserGroup);
router.get("/getgroups", auth.authenticate, group.getgroup);
router.get("/groupmessages", group.getGroupMessages);
router.post("/sendgroupmessage", auth.authenticate, group.sendMessageToGroup);

module.exports = router;

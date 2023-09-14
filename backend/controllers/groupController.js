const Group = require("../models/groups");
const User = require("../models/user");

const Messages = require("../models/messsages");

const UserGroupMappper = require("../models/usergroupmapper");

const createUserGroup = async (req, res) => {
  try {
    const data = await req.user.createGroup({
      groupname: req.body.groupName,
      admin: req.user.name,
    });
    req.body.groupMember.map(async (item) => {
      await UserGroupMappper.create({ userId: item.id, groupId: data.id });
    });
    res.status(200).json({ success: true, message: data, statusCode: 200 });
  } catch (err) {
    res.status(500).json({ success: false, message: err, statusCode: 500 });
  }
};

const getgroup = async (req, res) => {
  try {
    const data = await req.user.getGroups({ through: { userId: req.user.id } });
    res.status(200).json({ success: true, message: data, statusCode: 200 });
  } catch (err) {
    res.status(500).json({ success: false, message: err, statusCode: 500 });
  }
};

const getGroupMessages = async (req, res, next) => {
  const groupnumber = req.query.groupID;
  const data = await Messages.findAll({
    where: { groupID: groupnumber },
    attributes: ["id", "message", "userId", "groupId"],
    include: [
      {
        model: User,
        attributes: ["name", "email"],
      },
    ],
    group: ["id"],
  });

  res.send(data);
};

const sendMessageToGroup = async (req, res) => {
  const groupId = req.query.groupId;
  console.log(req.body, groupId);
  try {
    const message = await req.user.createMessage({
      ...req.body,
      groupId: groupId,
    });
    console.log(message);
    res.status(200).json({ success: true, sentMessage: message });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err });
  }
};

module.exports = {
  createUserGroup,
  getgroup,
  getGroupMessages,
  sendMessageToGroup,
};

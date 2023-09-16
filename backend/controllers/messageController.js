const auth = require("../middleware/auth");
const Message = require("../models/messsages");
const User = require("../models/user");

const saveMessage = async (req, res) => {
  console.log('REQ.BODY',req.body)

  try {
    const message = await req.user.createMessage({ ...req.body });
     res.status(200).json({ success: true, sentMessage: message });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};


const showMessage = async (req, res, next) => {
  const users = await User.findAll();
  const messages = await Message.findAll();
  const array = [];
  const messagesData = {};
  messages.forEach((message) => {
    users.forEach((user) => {
      if (message.userId === user.id) {
        array.push({
          name: user.name,
          message: message.message,
          email: user.email,
        });
      }
    });
  });

  res.status(200).json(array);
};

module.exports = { saveMessage, showMessage };

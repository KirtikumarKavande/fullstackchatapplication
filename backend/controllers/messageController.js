const auth = require("../middleware/auth");
const Message = require("../models/messsages");
const User = require("../models/user");

const saveMessage = async (req, res) => {
  console.log('REQ.BODY', req.body)

  try {
    const message = await req.user.createMessage({ ...req.body });
    res.status(200).json({ success: true, sentMessage: message });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};



const showMessage = async (req, res, next) => {
  const { chatId } = req.params;
  const { id: userId } = req.user;

  try {
    const messages = await Message.findAll({
      where: { groupId:chatId },
      include: [{ model: User, as: 'user' }],
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json({ success: true, messages });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};
module.exports = { saveMessage, showMessage };

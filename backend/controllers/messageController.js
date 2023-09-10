const auth = require("../middleware/auth");
const Message =require('../models/messsages')

const saveMessage = async(req,res) => {
    try{
       const message= await req.user.createMessage({...req.body})
      return res.status(200).json({ success: true, sentMessage:message });


    }catch(err){
        res.status(400).json({ success: false, message:err });
    }
    
};

const showMessage = () => {};

module.exports = { saveMessage, showMessage };

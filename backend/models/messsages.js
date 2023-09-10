const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const messageModel= sequelize.define("messages", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  message:{
    type:Sequelize.STRING,
    allowNull:false
  },
  
  
});
module.exports=messageModel

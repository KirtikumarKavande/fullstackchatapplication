const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const groupsModel = sequelize.define("groups", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  groupname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  admin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = groupsModel;

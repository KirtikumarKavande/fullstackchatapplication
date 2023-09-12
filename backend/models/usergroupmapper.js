const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const usergroupMapper = sequelize.define("usergroupmapper", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
});
module.exports = usergroupMapper;

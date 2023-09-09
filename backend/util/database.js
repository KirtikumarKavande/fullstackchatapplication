const Sequelize = require("sequelize");
const sequelize = new Sequelize("chatapp", "root", "Kolhapur@64", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize("chatapp", "root", "Kolhapur@64", {
//   dialect: "mysql",
//   host: "localhost",
// });
// module.exports = sequelize;


const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "pass",
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  }
);

module.exports = sequelize;
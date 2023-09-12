const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const user = require("./models/user");
const message = require("./models/messsages");

const group = require("./models/groups");
const usergroupMapper = require("./models/usergroupmapper");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);
app.use(messageRoutes);

user.hasMany(message);
message.belongsTo(user);

group.hasMany(message);
message.belongsTo(group);

user.belongsToMany(group, { through: usergroupMapper });
group.belongsToMany(user, { through: usergroupMapper });


sequelize
  .sync()

  .then(() => {
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => {
    console.log(err);
  });

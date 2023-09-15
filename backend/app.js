const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");

const messageRoutes = require("./routes/messageRoutes");
const user = require("./models/user");
const message = require("./models/messsages");
const io=require('socket.io')(5000,{
  origin:['http://localhost:3000/']
})

io.on("connection",socket=>{
  console.log(socket.id)
  
  socket.on("send-message",data=>{
  socket.broadcast.emit('message',data)
  })
})

const group = require("./models/groups");
const usergroupMapper = require("./models/usergroupmapper");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);
app.use(messageRoutes);
app.use(groupRoutes);


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

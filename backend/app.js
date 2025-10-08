const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const sequelize = require("./util/database");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Models
const user = require("./models/user");
const message = require("./models/messsages");
const group = require("./models/groups");
const usergroupMapper = require("./models/usergroupmapper");
const jwt = require("jsonwebtoken");

const app = express();
const server = http.createServer(app); // ✅ create HTTP server

const { createAdapter } =require ("@socket.io/redis-adapter");
const { Redis }= require ("ioredis");

const pubClient = new Redis();
const subClient = pubClient.duplicate();


const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});
// const io = new Server(server, {
//   cors: { origin: "http://localhost:3000" },
//   adapter:createAdapter(pubClient, subClient)
// });
io.use((socket,next)=>{

  try {
   const {token} =socket.handshake.auth
  const user = jwt.verify(token, "98kirtikmarseqnjde132323123232kjcdbcf");

   console.log("user data",user)


  next()

  } catch (error) {
    console.log(error);
  }
})

io.on("connection", (socket) => {
  socket.on("connect-group", (groupId) => {
    socket.join(groupId)
  });

  socket.on('send-message',(chat)=>{
    socket.to(chat.chatId).emit('receive-message',chat.message)
  })

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json({ extended: false }));

// Routes
app.use(userRoutes);
app.use(messageRoutes);
app.use(groupRoutes);

// Sequelize associations
user.hasMany(message);
message.belongsTo(user);

group.hasMany(message);
message.belongsTo(group);

user.belongsToMany(group, { through: usergroupMapper });
group.belongsToMany(user, { through: usergroupMapper });

const PORT = process.env.PORT || 4000;

sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log("🚀 Server started on PORT " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

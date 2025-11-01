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
const server = http.createServer(app);

const { createAdapter } = require("@socket.io/redis-adapter");
const { Redis } = require("ioredis");

// Server identification for testing
const SERVER_ID = process.env.SERVER_ID || `Server-${Math.random().toString(36).substr(2, 9)}`;
console.log(`🔷 Starting ${SERVER_ID}`);

// Redis configuration with proper error handling and connection options
const redisConfig = {
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379,
  lazyConnect: true, // Don't connect immediately - wait for error handlers first
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    console.log(`[${SERVER_ID}] Redis retry attempt ${times}, waiting ${delay}ms`);
    return delay;
  },
  maxRetriesPerRequest: null, // Important for pub/sub
};

const pubClient = new Redis(redisConfig);
const subClient = pubClient.duplicate();

// CRITICAL: Attach error handlers BEFORE connecting
pubClient.on('error', (err) => {
  console.error(`[${SERVER_ID}] Redis pubClient Error:`, err.message);
});

subClient.on('error', (err) => {
  console.error(`[${SERVER_ID}] Redis subClient Error:`, err.message);
});

pubClient.on('connect', () => {
  console.log(`[${SERVER_ID}] ✅ Redis pubClient connected`);
});

subClient.on('connect', () => {
  console.log(`[${SERVER_ID}] ✅ Redis subClient connected`);
});

pubClient.on('ready', () => {
  console.log(`[${SERVER_ID}] ✅ Redis pubClient ready`);
});

subClient.on('ready', () => {
  console.log(`[${SERVER_ID}] ✅ Redis subClient ready`);
});

// Now connect after error handlers are in place
pubClient.connect().catch((err) => {
  console.error(`[${SERVER_ID}] Failed to connect pubClient:`, err);
});

subClient.connect().catch((err) => {
  console.error(`[${SERVER_ID}] Failed to connect subClient:`, err);
});

// Socket.IO server with CORS for multiple frontends
const io = new Server(server, {
  cors: { 
    origin: [
      "http://localhost:3000",
      "http://localhost:3001", 
      "http://localhost:3002", 
      "http://localhost:3003"
    ],
    credentials: true
  },
  adapter: createAdapter(pubClient, subClient)
});
io.use((socket, next) => {

  try {
    const { token } = socket.handshake.auth
    console.log(`[${SERVER_ID}] token`, token)

    const user = jwt.verify(token, "98kirtikmarseqnjde132323123232kjcdbcf");

    // TODO: bug:user is getting logged even frontend doesn't sends requests
    console.log(`[${SERVER_ID}] user data`, user)
    next()
  } catch (error) {
    console.log(`[${SERVER_ID}] Error:`, error);
  }
})

io.on("connection", (socket) => {
  console.log(`[${SERVER_ID}] ✅ User connected:`, socket.id);
  socket.on("connect-group", (groupId) => {
    console.log(`[${SERVER_ID}] 📁 User ${socket.id} joined group:`, groupId)

    socket.join(groupId)
  });

  socket.on('send-message', (chat) => {
    console.log(`[${SERVER_ID}] 💬 Message from ${socket.id}:`, chat)
    socket.to(chat.chatId).emit('receive-message', chat)
  })

  socket.on("disconnect", () => {
    console.log(`[${SERVER_ID}] ❌ User disconnected:`, socket.id);
  });
  
  // Emit server info to help identify which backend the client is connected to
  socket.emit('server-info', { serverId: SERVER_ID });
});

// Middlewares - CORS for multiple frontends
app.use(cors({ 
  origin: [
    "http://localhost:3000",
    "http://localhost:3001", 
    "http://localhost:3002", 
    "http://localhost:3003"
  ],
  credentials: true
}));
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
      console.log(`🚀 ${SERVER_ID} started on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`[${SERVER_ID}] Error:`, err);
  });

const sequelize = require("./util/database");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.json({ extended: false }));

app.use(userRoutes);

sequelize
  .sync()

  .then(() => {
    app.listen(process.env.PORT || 4000);
  })
  .catch((err) => {
    console.log(err);
  });

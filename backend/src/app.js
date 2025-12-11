const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { sequelize } = require("./models");
const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/item.routes");
const homeRoutes = require("./routes/home.routes");

require("./cron/expiryChecker"); // start cron

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/home", homeRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync({ alter: true });
    console.log("Models synced");
  } catch (err) {
    console.error("DB connection error:", err);
  }
})();

module.exports = app;

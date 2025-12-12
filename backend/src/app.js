const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { sequelize } = require("./models");
const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/item.routes");
const homeRoutes = require("./routes/home.routes");
const notificationRoutes = require("./routes/notification.routes");

require("./cron/expiryChecker");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/items", itemRoutes);
app.use("/home", homeRoutes);
app.use("/notifications", notificationRoutes);

app.get("/", (req, res) => res.json({ ok: true, message: "Stoko API" }));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✓ Database connected");
    await sequelize.sync();
    console.log("✓ Models synced");
  } catch (err) {
    console.error("✗ DB connection error:", err);
  }
})();

// Add this at the end
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`);
});

module.exports = app;

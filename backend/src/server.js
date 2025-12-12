const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log(`✓ Stoko Backend Server Started`);
  console.log(`✓ Port: ${PORT}`);
  console.log(`✓ API: http://localhost:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log("=================================");
});
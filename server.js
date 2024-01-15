const app = require("./src/app");
const mongoose = require("mongoose");
const { PORT, DB_URL } = require("./src/config");

(async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server with error: ", err.message);
    process.exit(1);
  }
})();

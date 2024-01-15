require("dotenv").config();

const { PORT = 5000, DB_URL } = process.env;

module.exports = {
  PORT,
  DB_URL,
};

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger.json");

// import routes here
const usersProductsRouter = require("./routes/api/usersProducts");
const authRouter = require("./routes/api/auth");
const productsRouter = require("./routes/api/products");
const calculateRouter = require("./routes/api/calculate");

const app = express();
const coreOptions = require("../cors");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors(coreOptions));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// use routes here
app.use("/api/diary", usersProductsRouter);
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/calculate", calculateRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

module.exports = app;

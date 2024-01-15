const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  validationQuery,
} = require("../../middlewares/validationMiddleware.js");

const { productsSchema } = require("../../joiSchema/productsSchema");

const {
  getProductsController,
} = require("../../controllers/productsController");

router.get(
  "/",
  validationQuery(productsSchema),
  asyncWrapper(getProductsController)
);

module.exports = router;

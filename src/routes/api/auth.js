const express = require("express");
const router = express.Router();

const {
  login,
  logout,
  signup,
  currentUser,
} = require("../../controllers/authController");

const { validationBody } = require("../../middlewares/validationMiddleware.js");
const { schemaAuth } = require("../../joiSchema/authSchema");
const {
  registrationUserSchema,
} = require("../../joiSchema/registrationSchema.js");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const validationToken = require("../../middlewares/validationToken.js");

router.post(
  "/signup",
  validationBody(registrationUserSchema),
  asyncWrapper(signup)
);
router.post("/login", validationBody(schemaAuth), asyncWrapper(login));
router.post("/logout", validationToken, asyncWrapper(logout));
router.get("/current", validationToken, asyncWrapper(currentUser));

router.use(validationToken);

module.exports = router;

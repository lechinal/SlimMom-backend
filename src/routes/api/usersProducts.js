const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getUserProductsByDateController,
} = require("../../controllers/userProductsController");

const {
  postUserDiaryInfoController,
  getUserDiaryInfoController,
} = require("../../controllers/userDiaryInfoController");

const {
  createUserProductController,
} = require("../../controllers/userProductsController");

const validationToken = require("../../middlewares/validationToken.js");
const { validationBody } = require("../../middlewares/validationMiddleware.js");
const { schemaDiaryInfo } = require("../../joiSchema/diaryInfoSchema");
const { userProductSchema } = require("../../joiSchema/userProductSchema");
const {
  deleteDiaryListItem,
} = require("../../controllers/userProductsController");

router.get(
  "/dayinfo",
  validationToken,
  asyncWrapper(getUserDiaryInfoController)
);

router.get(
  "/:date",
  validationToken,
  asyncWrapper(getUserProductsByDateController)
);

router.post(
  "/dayinfo",
  validationToken,
  validationBody(schemaDiaryInfo),
  asyncWrapper(postUserDiaryInfoController)
);

router.post(
  "/:date",
  validationToken,
  validationBody(userProductSchema),
  asyncWrapper(createUserProductController)
);

router.delete("/:id", validationToken, asyncWrapper(deleteDiaryListItem));

module.exports = router;

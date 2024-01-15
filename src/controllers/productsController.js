const { getProductsByTitle } = require("../models/products");

const getProductsController = async (req, res, next) => {
  try {
    const { productTitle = "", limit = 50 } = req.query;

    const products = await getProductsByTitle(productTitle, limit);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProductsController: ", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  getProductsController,
};

const Product = require("./schemas/products");

const getProductsByTitle = async (productTitle, limit) => {
  const regex = new RegExp(productTitle, "i");
  const query = { title: regex };

  const products = await Product.find(query)
    .limit(limit)
    .catch(() => null);

  return products;
};

module.exports = {
  getProductsByTitle,
};

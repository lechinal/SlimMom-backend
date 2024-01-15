const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  categories: {
    type: [String],
    required: [true, "Product categories"],
  },
  title: {
    en: {
      type: String,
      index: true,
    },
  },
  weight: {
    type: Number,
    required: [true, "Product weight"],
    default: 100,
  },
  calories: {
    type: Number,
    required: [true, "Product calories"],
  },
  groupBloodNotAllowed: {
    type: [Boolean],
    required: [true, "Product groupBloodNotAllowed"],
  },
});

const Product = model("product", productSchema);

const product = new Product({
  title: {
    en: "English Title",
  },
});

module.exports = Product;

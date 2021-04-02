const Product = require('../models/product.model');

const getProducts = async (query) => Product.find(query).select('-_id -__v');
const createProduct = async (body) => new Product(body).save();
const getProduct = async (id) => Product.findOne({ sku: id }).select('-_id -__v');
const replaceProduct = async (id, body) => Product.findOneAndReplace({ sku: id }, body);
const modifyProduct = async (id, body) => Product.findOneAndUpdate({ sku: id }, body, { new: true }).select('-_id -__v');
const deleteProduct = async (id) => Product.deleteOne({ sku: id });
const deleteProducts = async () => Product.deleteMany({});

module.exports = {
  getProducts,
  createProduct,
  getProduct,
  replaceProduct,
  modifyProduct,
  deleteProduct,
  deleteProducts,
};

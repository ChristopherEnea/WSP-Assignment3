const ProductService = require('../services/product.services');

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
            || e.stack.includes('ValidationError')
            || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? 400 : 500,
    );
  }
};

const getProducts = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const products = await ProductService.getProducts(req.query);
    if (products.length === 0) {
      return res.sendStatus(404);
    }
    return res.json(products);
  });
};

const getProduct = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const getResult = await ProductService.getProduct(req.params.sku);
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const createProduct = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    await ProductService.createProduct(req.body);
    res.sendStatus(201);
  });
};

const replaceProduct = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    await ProductService.replaceProduct(req.params.sku, req.body);
    return res.sendStatus(200);
  });
};

const modifyProduct = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const patchResult = await ProductService.modifyProduct(req.params.sku, req.body);
    if (patchResult != null) {
      res.json(patchResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteProduct = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    const getResult = await ProductService.deleteProduct(req.params.sku);
    if (getResult != null) {
      res.json(getResult);
    } else {
      res.sendStatus(404);
    }
  });
};

const deleteProducts = async (req, res) => {
  await doActionThatMightFailValidation(req, res, async () => {
    res.json(await ProductService.deleteProducts());
  });
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  replaceProduct,
  modifyProduct,
  deleteProduct,
  deleteProducts,
};

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

const getProducts = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const products = await ProductService.getProducts(request.query);
    if (products.length === 0) {
      return response.sendStatus(404);
    }
    return response.json(products);
  });
};

const getProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await ProductService.getProduct(request.params.sku);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

const createProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await ProductService.createProduct(request.body);
    response.sendStatus(201);
  });
};

const replaceProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await ProductService.replaceProduct(request.params.sku, request.body);
    return response.sendStatus(200);
  });
};

const modifyProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await ProductService.modifyProduct(request.params.sku, request.body);
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(404);
    }
  });
};

const deleteProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await ProductService.deleteProduct(request.params.sku);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(404);
    }
  });
};

const deleteProducts = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    response.json(await ProductService.deleteProducts());
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

const StatusCodes = require('http-status-codes');
const ProductService = require('../services/product.services');

const doActionThatMightFailValidation = async (request, response, action) => {
  try {
    await action();
  } catch (e) {
    response.sendStatus(
      e.code === 11000
            || e.stack.includes('ValidationError')
            || (e.reason !== undefined && e.reason.code === 'ERR_ASSERTION')
        ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

const getProducts = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const products = await ProductService.getProducts(request.query);
    if (products.length === 0) {
      return response.sendStatus(StatusCodes.NOT_FOUND);
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
      response.sendStatus(StatusCodes.NOT_FOUND);
    }
  });
};

const createProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await ProductService.createProduct(request.body);
    response.sendStatus(StatusCodes.CREATED);
  });
};

const replaceProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    await ProductService.replaceProduct(request.params.sku, request.body);
    return response.sendStatus(StatusCodes.OK);
  });
};

const modifyProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const patchResult = await ProductService.modifyProduct(request.params.sku, request.body);
    if (patchResult != null) {
      response.json(patchResult);
    } else {
      response.sendStatus(StatusCodes.NOT_FOUND);
    }
  });
};

const deleteProduct = async (request, response) => {
  await doActionThatMightFailValidation(request, response, async () => {
    const getResult = await ProductService.deleteProduct(request.params.sku);
    if (getResult != null) {
      response.json(getResult);
    } else {
      response.sendStatus(StatusCodes.NOT_FOUND);
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

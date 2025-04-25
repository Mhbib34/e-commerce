import {
  create,
  deleted,
  get,
  getAllProductsService,
  update,
} from "../services/product-services.js";

const createProductHandler = async (req, res, next) => {
  try {
    const result = await create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProductHandler = async (req, res, next) => {
  try {
    const result = await get(req.body);
    res.status(200).json({
      success: true,
      message: "Find product successfully",
      product: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await update(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      product: result,
    });
  } catch (error) {
    next(error);
  }
};

const deletedProductHandler = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await deleted(id);
    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const { search, categoryName, minPrice, maxPrice } = req.query;
    const result = await getAllProductsService({
      search,
      categoryName,
      minPrice,
      maxPrice,
    });
    res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      product: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create: createProductHandler,
  get: getProductHandler,
  update: updateProductHandler,
  deleted: deletedProductHandler,
  getAll: getAllProducts,
};

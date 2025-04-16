import { create, deleted, get, getAll } from "../services/category-service.js";

const createCategoryHandler = async (req, res, next) => {
  try {
    const result = await create(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryHandler = async (req, res, next) => {
  try {
    const result = await get(req.body);
    res.status(200).json({
      success: true,
      message: "Get category successfully",
      category: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCategoryHandler = async (req, res, next) => {
  try {
    const result = await getAll();
    res.status(200).json({
      success: true,
      message: "Get All category successfully",
      category: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryHandler = async (req, res, next) => {
  try {
    await deleted(req.query.name);
    res.status(200).json({
      success: true,
      message: "Delete category successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create: createCategoryHandler,
  get: getCategoryHandler,
  getAll: getAllCategoryHandler,
  delete: deleteCategoryHandler,
};

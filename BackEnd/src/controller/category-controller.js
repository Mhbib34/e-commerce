import { create, get } from "../services/category-service.js";

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
  const result = await get(req.body);
  res.status(200).json({
    success: true,
    message: "Get category successfully",
    category: result,
  });
};

export default {
  create: createCategoryHandler,
  get: getCategoryHandler,
};

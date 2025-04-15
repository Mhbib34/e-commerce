import { create } from "../services/category-service.js";

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

export default {
  create: createCategoryHandler,
};

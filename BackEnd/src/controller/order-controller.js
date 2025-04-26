import { create } from "../services/order-services.js";

const createOrderHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    const result = await create(userId, items);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      order: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create: createOrderHandler,
};

import { create } from "../services/order-services.js";

const createOrderHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await create(userId);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create: createOrderHandler,
};

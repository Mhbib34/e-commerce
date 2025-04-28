import { create, getOrderByUser } from "../services/order-services.js";

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

const getOrderByUserHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getOrderByUser(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create: createOrderHandler,
  getOrderByUserId: getOrderByUserHandler,
};

import {
  create,
  getAllOrder,
  getOrderById,
  getOrderByUser,
  getPaginatedOrders,
} from "../services/order-services.js";

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

const getOrderByIdHandler = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const result = await getOrderById(orderId);
    res.status(200).json({
      success: true,
      message: "Get order successfully",
      order: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrderHandler = async (req, res, next) => {
  try {
    const result = await getAllOrder();
    res.status(200).json({
      success: true,
      message: "Get All order successfully",
      order: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderByUserParamsHandler = async (req, res, next) => {
  try {
    const userId = req.params.id;
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

const getAllOrdersPaginations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getPaginatedOrders(page, limit);
    res.status(200).json({
      status: "success",
      message: "Orders fetched successfully",
      order: result,
    });
  } catch (error) {
    next(error);
  }
};
export default {
  create: createOrderHandler,
  getOrderByUserId: getOrderByUserHandler,
  getById: getOrderByIdHandler,
  getAll: getAllOrderHandler,
  getByParams: getOrderByUserParamsHandler,
  getPage: getAllOrdersPaginations,
};

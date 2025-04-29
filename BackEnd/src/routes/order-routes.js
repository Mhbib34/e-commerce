import express from "express";
import userAuth from "../middleware/user-auth-middleware.js";
import orderController from "../controller/order-controller.js";
import { isAdmin } from "../middleware/is-admin.js";

export const orderRouter = new express.Router();

orderRouter.post("/create", userAuth, orderController.create);
orderRouter.get("/get", userAuth, orderController.getOrderByUserId);
orderRouter.get("/get/:id", userAuth, orderController.getById);
orderRouter.get("/get-all", userAuth, isAdmin, orderController.getAll);
orderRouter.get("/get-order/:id", userAuth, orderController.getByParams);

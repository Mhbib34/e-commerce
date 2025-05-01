import express from "express";
import userAuth from "../middleware/user-auth-middleware.js";
import orderController from "../controller/order-controller.js";
import { isAdmin } from "../middleware/is-admin.js";

export const orderRouter = new express.Router();

orderRouter.post("/", userAuth, orderController.create);
orderRouter.get("/list", userAuth, isAdmin, orderController.getAll);
orderRouter.get("/user/:id", userAuth, orderController.getByParams);
orderRouter.get("/:id", userAuth, orderController.getById);
orderRouter.get("/", userAuth, orderController.getOrderByUserId);

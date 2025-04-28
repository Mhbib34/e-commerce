import express from "express";
import userAuth from "../middleware/user-auth-middleware.js";
import orderController from "../controller/order-controller.js";

export const orderRouter = new express.Router();

orderRouter.post("/create", userAuth, orderController.create);
orderRouter.get("/get", userAuth, orderController.getOrderByUserId);

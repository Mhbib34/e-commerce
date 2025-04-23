import express from "express";
import productController from "../controller/product-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";
import { isAdmin } from "../middleware/is-admin.js";

export const productRouter = new express.Router();

productRouter.post("/create", userAuth, isAdmin, productController.create);

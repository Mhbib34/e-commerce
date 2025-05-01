import express from "express";
import productController from "../controller/product-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";
import { isAdmin } from "../middleware/is-admin.js";

export const productRouter = new express.Router();

productRouter.post("/", userAuth, isAdmin, productController.create);
productRouter.get("/list", userAuth, productController.getAll);
productRouter.get("/", userAuth, productController.get);
productRouter.patch("/:id", userAuth, isAdmin, productController.update);
productRouter.delete("/:id", userAuth, isAdmin, productController.deleted);

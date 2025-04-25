import express from "express";
import productController from "../controller/product-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";
import { isAdmin } from "../middleware/is-admin.js";

export const productRouter = new express.Router();

productRouter.post("/create", userAuth, isAdmin, productController.create);
productRouter.get("/get", userAuth, productController.get);
productRouter.get("/get-all", userAuth, productController.getAll);
productRouter.patch("/update/:id", userAuth, isAdmin, productController.update);
productRouter.delete(
  "/delete/:id",
  userAuth,
  isAdmin,
  productController.deleted
);

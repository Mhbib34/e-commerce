import express from "express";
import productController from "../controller/product-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";
import { isAdmin } from "../middleware/is-admin.js";
import { upload } from "../middleware/upload.js";

export const productRouter = new express.Router();

productRouter.post(
  "/",
  userAuth,
  isAdmin,
  upload.single("image"),
  productController.create
);
productRouter.get("/list", userAuth, productController.getAll);
productRouter.get("/:id", userAuth, productController.get);
productRouter.patch(
  "/:id",
  userAuth,
  isAdmin,
  upload.single("image"),
  productController.update
);
productRouter.delete("/:id", userAuth, isAdmin, productController.deleted);

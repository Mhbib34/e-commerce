import express from "express";
import productController from "../controller/product-controller.js";

export const productRouter = new express.Router();

productRouter.post("/create", productController.create);

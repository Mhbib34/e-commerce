import express from "express";
import categoryController from "../controller/category-controller.js";

export const categoryRouter = new express.Router();

categoryRouter.post("/create", categoryController.create);
categoryRouter.get("/get", categoryController.get);

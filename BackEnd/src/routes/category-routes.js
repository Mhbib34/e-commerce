import express from "express";
import categoryController from "../controller/category-controller.js";
import { isAdmin } from "../middleware/is-admin.js";
import userAuth from "../middleware/user-auth-middleware.js";

export const categoryRouter = new express.Router();

categoryRouter.post("/", userAuth, isAdmin, categoryController.create);
categoryRouter.get("/list", userAuth, categoryController.getAll);
categoryRouter.get("/", userAuth, categoryController.get);
categoryRouter.delete("/", userAuth, isAdmin, categoryController.delete);

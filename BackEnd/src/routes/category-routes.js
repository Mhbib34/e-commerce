import express from "express";
import categoryController from "../controller/category-controller.js";
import { isAdmin } from "../middleware/is-admin.js";
import userAuth from "../middleware/user-auth-middleware.js";

export const categoryRouter = new express.Router();

categoryRouter.post("/create", userAuth, isAdmin, categoryController.create);
categoryRouter.get("/get", userAuth, categoryController.get);
categoryRouter.get("/get-all", userAuth, categoryController.getAll);
categoryRouter.delete("/delete", userAuth, isAdmin, categoryController.delete);

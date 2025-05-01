import express from "express";
import userAuth from "../middleware/user-auth-middleware.js";
import cartItemController from "../controller/cart-item-controller.js";

export const cartItemRouter = new express.Router();

cartItemRouter.post("/", userAuth, cartItemController.addCart);
cartItemRouter.get("/", userAuth, cartItemController.getCart);
cartItemRouter.delete("/:id", userAuth, cartItemController.remove);

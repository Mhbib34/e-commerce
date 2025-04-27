import express from "express";
import userAuth from "../middleware/user-auth-middleware.js";
import cartItemController from "../controller/cart-item-controller.js";

export const cartItemRouter = new express.Router();

cartItemRouter.post("/add-to-cart", userAuth, cartItemController.addCart);
cartItemRouter.get("/get-cart", userAuth, cartItemController.getCart);

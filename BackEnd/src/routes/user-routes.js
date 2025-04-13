import express from "express";
import userController from "../controller/user-controller.js";
export const userRouter = new express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

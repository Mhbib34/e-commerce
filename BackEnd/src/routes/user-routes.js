import express from "express";
import userController from "../controller/user-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";
export const userRouter = new express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userAuth, userController.logout);
userRouter.get("/get", userAuth, userController.get);
userRouter.post("/send-verify-otp", userAuth, userController.verifyOtp);

import express from "express";
import userController from "../controller/user-controller.js";
import userAuth from "../middleware/user-auth-middleware.js";
export const userRouter = new express.Router();
import { isAdmin } from "../middleware/is-admin.js";

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.post("/logout", userAuth, userController.logout);
userRouter.get("/", userAuth, userController.get);
userRouter.delete("/:id", userAuth, isAdmin, userController.delete);
userRouter.patch("/", userAuth, userController.update);
userRouter.get("/page", userAuth, userController.getPage);
userRouter.post("/send-verify-otp", userAuth, userController.verifyOtp);
userRouter.post("/verify-email", userAuth, userController.verifyEmail);
userRouter.post(
  "/send-reset-password-otp",
  userController.sendresetPasswordOtp
);
userRouter.post("/reset-password", userController.resetPassword);
userRouter.get("/list", userAuth, isAdmin, userController.getAll);

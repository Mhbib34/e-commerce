import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { userRouter } from "../routes/user-routes.js";
import errorMiddleware from "../middleware/error-middleware.js";
import { categoryRouter } from "../routes/category-routes.js";
import { productRouter } from "../routes/product-routes.js";
import { orderRouter } from "../routes/order-routes.js";
import { cartItemRouter } from "../routes/cart-item-routes.js";

export const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartItemRouter);
app.use(errorMiddleware);

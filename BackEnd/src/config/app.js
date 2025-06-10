import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import { userRouter } from "../routes/user-routes.js";
import { categoryRouter } from "../routes/category-routes.js";
import { productRouter } from "../routes/product-routes.js";
import { orderRouter } from "../routes/order-routes.js";
import { cartItemRouter } from "../routes/cart-item-routes.js";
import errorMiddleware from "../middleware/error-middleware.js";

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = ["http://localhost:3000"];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartItemRouter);

app.use(errorMiddleware);

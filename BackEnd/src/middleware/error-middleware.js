import { Prisma } from "@prisma/client";
import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(400).json({
        errors: err.message,
      });
    } else {
      res.status(500).json({
        errors: err.message,
      });
    }
  } else {
    res.status(500).json({
      errors: err.message || "Internal Server Error",
    });
  }
};

export default errorMiddleware;

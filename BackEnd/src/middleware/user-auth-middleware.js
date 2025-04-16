import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../app/database.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new ResponseError(401, "Not authorized, Login again");
    }

    let tokenDecode;
    try {
      tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new ResponseError(401, "Invalid or expired token");
    }

    if (tokenDecode?.id && tokenDecode?.email) {
      const user = await prismaClient.user.findUnique({
        where: {
          email: tokenDecode.email,
        },
      });

      if (!user) {
        throw new ResponseError(401, "User not found");
      }

      req.user = {
        id: tokenDecode.id,
        email: tokenDecode.email,
        role: user.role,
      };
    } else {
      throw new ResponseError(401, "Not authorized, Login again");
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default userAuth;

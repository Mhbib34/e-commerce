import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../config/database.js";

const userAuth = async (req, res, next) => {
  try {
    let token;

    // Try to get token from cookie first (for browser requests)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log("🍪 Token from cookie:", token ? "exists" : "missing");
    }

    // If no token in cookie, try Authorization header (for API requests)
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove "Bearer " prefix
        console.log(
          "🔑 Token from Authorization header:",
          token ? "exists" : "missing"
        );
      }
    }

    if (!token) {
      throw new ResponseError(401, "Not authorized, Login again");
    }

    let tokenDecode;
    try {
      tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token decoded successfully:", tokenDecode);
    } catch (err) {
      console.error("❌ Token verification failed:", err.message);
      throw new ResponseError(401, "Invalid or expired token");
    }

    if (tokenDecode?.id && tokenDecode?.email) {
      const user = await prismaClient.user.findUnique({
        where: {
          id: tokenDecode.id,
        },
      });

      if (!user) {
        console.error("❌ User not found in database:", tokenDecode.id);
        throw new ResponseError(401, "User not found");
      }

      req.user = {
        id: tokenDecode.id,
        email: tokenDecode.email,
        role: user.role,
      };

      console.log("✅ User authenticated:", req.user);
    } else {
      console.error("❌ Invalid token payload:", tokenDecode);
      throw new ResponseError(401, "Not authorized, Login again");
    }

    next();
  } catch (error) {
    console.error("❌ Authentication error:", error.message);
    next(error);
  }
};

export default userAuth;

import { addToCart } from "../services/cart-item-services.js";

const addToCartHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    const result = await addToCart(userId, productId, quantity);
    res.status(201).json({
      success: true,
      message: "Cart item created successfully",
      cart: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addCart: addToCartHandler,
};

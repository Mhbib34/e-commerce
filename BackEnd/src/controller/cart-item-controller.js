import {
  addToCart,
  getCartByUser,
  removeCart,
} from "../services/cart-item-services.js";

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

const getCartByUserHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getCartByUser(userId);
    res.status(200).json({
      success: true,
      message: "Cart item fetched successfully",
      cart: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeCartHandler = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItemId = req.params.id;
    const result = await removeCart(userId, cartItemId);
    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addCart: addToCartHandler,
  getCart: getCartByUserHandler,
  remove: removeCartHandler,
};

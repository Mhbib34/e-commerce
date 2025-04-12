import { create } from "../services/user-services.js";

const registerUserHandler = async (req, res, next) => {
  try {
    const result = await create(req.body);
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register: registerUserHandler,
};

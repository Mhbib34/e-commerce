import { create, get, login, logout } from "../services/user-services.js";
import jwt from "jsonwebtoken";
import transporter from "../app/nodemailer.js";
import { welcomeEmailTemplate } from "../app/email-template.js";

const registerUserHandler = async (req, res, next) => {
  try {
    const result = await create(req.body);
    const token = jwt.sign(
      { id: result.id, email: result.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: result.email,
      subject: `Welcome ${result.name}!`,
      html: welcomeEmailTemplate(result.email, result.name),
    };
    await transporter.sendMail(mailOption);

    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: result,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginUserHandler = async (req, res, next) => {
  try {
    const result = await login(req.body);
    const token = jwt.sign(
      { id: result.id, email: result.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "User login successfully",
      user: {
        id: result.id,
        username: result.username,
        name: result.name,
        email: result.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUserHandler = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json(logout());
  } catch (error) {
    next(error);
  }
};

const getUserHandler = async (req, res, next) => {
  try {
    const email = req.user.email;
    const result = await get(email);
    res.status(200).json({
      success: true,
      message: "Get User successfully",
      user: {
        id: result.id,
        username: result.username,
        name: result.name,
        email: result.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register: registerUserHandler,
  login: loginUserHandler,
  logout: logoutUserHandler,
  get: getUserHandler,
};

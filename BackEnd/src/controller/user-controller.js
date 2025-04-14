import {
  create,
  get,
  login,
  logout,
  resetPasswordOtp,
  verifyEmail,
  verifyOtp,
} from "../services/user-services.js";
import jwt from "jsonwebtoken";
import transporter from "../app/nodemailer.js";
import {
  otpEmailTemplate,
  welcomeEmailTemplate,
} from "../app/email-template.js";

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
    const id = req.user.id;
    const result = await get(id);
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

const verifyOtpHandler = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { otp, user } = await verifyOtp(id);

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Account Verify OTP!`,
      html: otpEmailTemplate(user.name, otp, "verify your email"),
    };
    await transporter.sendMail(mailOption);

    res.status(200).json({
      success: true,
      message: "Verification OTP sent on email",
    });
  } catch (error) {
    next(error);
  }
};

const emailVerifyHandler = async (req, res, next) => {
  try {
    const id = req.user.id;
    const { otp } = req.body;
    const user = await verifyEmail(id, otp);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

const sendResetPasswordOtpHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const { otp, user } = await resetPasswordOtp(email);
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: `Reset Password OTP!`,
      html: otpEmailTemplate(user.name, otp, "reset your password"),
    };
    await transporter.sendMail(mailOption);

    res.status(200).json({
      success: true,
      message: "Reset password OTP sent on email",
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
  verifyOtp: verifyOtpHandler,
  verifyEmail: emailVerifyHandler,
  sendresetPasswordOtp: sendResetPasswordOtpHandler,
};

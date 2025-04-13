import { create } from "../services/user-services.js";
import jwt from "jsonwebtoken";
import transporter from "../app/nodemailer.js";
import { welcomeEmailTemplate } from "../app/email-template.js";

const registerUserHandler = async (req, res, next) => {
  try {
    const result = await create(req.body);
    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

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

export default {
  register: registerUserHandler,
};

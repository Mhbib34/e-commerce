import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation.js";
import validate from "../validation/validation.js";
import bcrypt from "bcrypt";

export const create = async (request) => {
  const user = validate(registerUserValidation, request);
  const findUser = await prismaClient.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (findUser)
    throw new ResponseError(
      400,
      "Email already exists. Please use another email."
    );

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      isAccountVerified: true,
    },
  });
};

export const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);
  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      password: true,
    },
  });
  if (!user) throw new ResponseError(401, "Email or password is wrong!");

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid)
    throw new ResponseError(401, "Email or password is wrong!");

  return user;
};

export const logout = () => {
  return { success: true, message: "User logged out successfully" };
};

export const get = async (id) => {
  id = validate(getUserValidation, id);
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
    },
  });
  if (!user) throw new ResponseError(404, "User is not found");
  return user;
};

export const verifyOtp = async (id) => {
  id = validate(getUserValidation, id);
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });

  console.log(user.id);

  if (!user) throw new ResponseError(404, "User is not found");
  if (user.verifyOtp) throw new ResponseError(400, "OTP has been sent");
  if (user.isAccountVerified)
    throw new ResponseError(400, "User already verified!");

  const otp = Math.floor(100000 + Math.random() * 900000);

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      verifyOtp: otp,
      verifyOtpExpireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
  return { otp, user };
};

export const verifyEmail = async (id, otp) => {
  if (!id || !otp) throw new ResponseError(400, "Missing details!");

  id = validate(getUserValidation, id);
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) throw new ResponseError(404, "User is not found");

  if (user.verifyOtpExpireAt < Date.now()) {
    throw new ResponseError(400, "OTP Expired");
  }

  if (user.verifyOtp !== otp) throw new ResponseError(400, "Invalid OTP");

  const updatedUser = await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      isAccountVerified: true,
      verifyOtp: null,
      verifyOtpExpireAt: null,
    },
  });
  return updatedUser;
};

export const resetPasswordOtp = async (email) => {
  if (!email) throw new ResponseError(400, "Email is required!");

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new ResponseError(404, "User is not found!");

  if (user.resetOtp) throw new ResponseError(400, "OTP has been sent");

  const otp = Math.floor(100000 + Math.random() * 900000);

  await prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetOtp: otp,
      resetOtpExpireAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });
  return { otp, user };
};

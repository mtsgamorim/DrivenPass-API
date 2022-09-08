import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as userRepositories from "../repositories/userRepositories.js";

dotenv.config();

export async function verifyTokenReturnId(token: string) {
  const secret = process.env.JWT_SECRET;
  try {
    const userId: any = jwt.verify(token, secret);
    const user = await userRepositories.getUserbyId(userId.id);
    return user;
  } catch (error) {
    return null;
  }
}

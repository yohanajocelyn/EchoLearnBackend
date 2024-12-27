import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UserResponse,
} from "../models/user-model";
import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export class UserService {
  //register
  static async register(req: RegisterUserRequest): Promise<UserResponse> {
    const registerReq = Validation.validate(UserValidation.REGISTER, req);

    const email = await prismaClient.user.findUnique({
      where: {
        email: registerReq.email,
      },
    });

    if (email) {
      throw new ResponseError(400, "Email already exists");
    }

    const username = await prismaClient.user.findUnique({
      where: {
        username: registerReq.username,
      },
    });

    if (username) {
      throw new ResponseError(400, "Username already exists");
    }

    registerReq.password = await bcrypt.hash(registerReq.password, 10);

    const user = await prismaClient.user.create({
      data: {
        email: registerReq.email,
        username: registerReq.username,
        password: registerReq.password,
        profilePicture: registerReq.profilePicture,
        token: uuid(),
      },
    });

    return toUserResponse(user);
  }

  //login
  static async login(req: LoginUserRequest): Promise<UserResponse> {
    const loginReq = Validation.validate(UserValidation.LOGIN, req);

    let user = await prismaClient.user.findUnique({
      where: {
        email: loginReq.email,
      },
    });

    if (!user) {
      throw new ResponseError(400, "Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(
      loginReq.password,
      user.password
    );

    if (!passwordMatch) {
      throw new ResponseError(400, "Invalid email or password");
    }

    user = await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: uuid(),
      },
    });

    return toUserResponse(user);
  }

  //logout
  static async logout(user: User): Promise<string> {
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
      },
    });

    return "Logout Successful!";
  }
}

import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import {
  GetUserResponse,
  LoginUserRequest,
  RegisterUserRequest,
  toGetUserResponse,
  toUserResponse,
  LeaderboardResponse,
  UserResponse,
  toLeaderboardResponse,
  UpdateUserRequest,
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
        profilePicture: `public/images/${registerReq.profilePicture}.jpg`,
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

  static async getAllUsers(): Promise<GetUserResponse[]> {
    const users = await prismaClient.user.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return users.map((user) => toGetUserResponse(user));
  }

  static async getUserById(userr:User, username: String): Promise<GetUserResponse> {
    const user = await prismaClient.user.findUnique({
      where: {
        username: username.toString(),
      },
    });

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    return toGetUserResponse(user);
  }

  static async getUserByTotalScore(user:User): Promise<LeaderboardResponse[]> {
    const users = await prismaClient.user.findMany({
      orderBy: {
        totalScore: "desc",
      },
    });
    return users.map((user) => toLeaderboardResponse(user));
  } 

  static async updateUser(user : User, req: UpdateUserRequest): Promise<string> {
      const findUser = await prismaClient.user.findUnique({
        where:{
          id: user.id
        }
      })
      let currPhoto= null
      if(req.profilePicture == ""){
        currPhoto = findUser?.profilePicture
      }else {
        currPhoto = req.profilePicture
      }
      const updateuser = await prismaClient.user.update({
          where: {
           id: user.id
          },
          data: {
            email: req.email,
            username: req.password,
            profilePicture : `public/images/${currPhoto}.jpg`
            
          }
      })
      return "success"
  }
}

import { NextFunction, Request, Response } from "express";
import {
  GetUserResponse,
  toLeaderboardResponse,
  LoginUserRequest,
  RegisterUserRequest,
  UserResponse,
  LeaderboardResponse,
  UpdateUserRequest,
} from "../models/user-model";
import { UserService } from "../services/user-service";
import { UserRequest } from "../types/user-request";

//Cara login:
//1. Register (JANGAN LUPA PASSWORDNYA)
//2. Login
//3. Ambil token yang dikasih di response
//4. Tambahkan X-API-TOKEN pada header request
//5. Copas token yang tadi dikasih ke X-API-TOKEN

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response: UserResponse = await UserService.register(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response: UserResponse = await UserService.login(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response: string = await UserService.logout(req.user!);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const response: GetUserResponse[] = await UserService.getAllUsers();

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserByUsername(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const response: GetUserResponse = await UserService.getUserById(
        req.user!,
        req.params.username
      );
      response.profilePicture = `${baseUrl}/${response.profilePicture}`;
      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserByTotalScore(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const response: LeaderboardResponse[] =
        await UserService.getUserByTotalScore(req.user!);
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      response.forEach((user) => {
        user.profilePicture = `${baseUrl}/${user.profilePicture}`;
      });
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as UpdateUserRequest;
      request.id = Number(req.params.userId);
      const response = await UserService.updateUser(req.user!, request);

      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
  }


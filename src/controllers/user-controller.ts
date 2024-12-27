import { NextFunction, Request, Response } from "express";
import { GetUserResponse, LoginUserRequest, RegisterUserRequest, UserResponse } from "../models/user-model";
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
            const request: RegisterUserRequest = req.body as RegisterUserRequest
            const response: UserResponse = await UserService.register(request)

            res.status(200).json({
                data: response
            })

        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body as LoginUserRequest
            const response: UserResponse = await UserService.login(request)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response: string = await UserService.logout(req.user!)

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const response: GetUserResponse[] = await UserService.getAllUsers()

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const response: GetUserResponse = await UserService.getUserById(Number(req.params.userId))

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
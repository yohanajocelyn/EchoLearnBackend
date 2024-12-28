"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user-service");
//Cara login:
//1. Register (JANGAN LUPA PASSWORDNYA)
//2. Login
//3. Ambil token yang dikasih di response
//4. Tambahkan X-API-TOKEN pada header request
//5. Copas token yang tadi dikasih ke X-API-TOKEN
class UserController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.register(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield user_service_1.UserService.login(request);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.logout(req.user);
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.getAllUsers();
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield user_service_1.UserService.getUserById(Number(req.params.userId));
                res.status(200).json({
                    data: response
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;

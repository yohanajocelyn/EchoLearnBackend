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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
const user_model_1 = require("../models/user-model");
const user_validation_1 = require("../validations/user-validation");
const validation_1 = require("../validations/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
class UserService {
    //register
    static register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerReq = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, req);
            const email = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: registerReq.email,
                },
            });
            if (email) {
                throw new response_error_1.ResponseError(400, "Email already exists");
            }
            const username = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: registerReq.username,
                },
            });
            if (username) {
                throw new response_error_1.ResponseError(400, "Username already exists");
            }
            registerReq.password = yield bcrypt_1.default.hash(registerReq.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: {
                    email: registerReq.email,
                    username: registerReq.username,
                    password: registerReq.password,
                    profilePicture: registerReq.profilePicture,
                    token: (0, uuid_1.v4)(),
                },
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    //login
    static login(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginReq = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, req);
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: loginReq.email,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(400, "Invalid email or password");
            }
            const passwordMatch = yield bcrypt_1.default.compare(loginReq.password, user.password);
            if (!passwordMatch) {
                throw new response_error_1.ResponseError(400, "Invalid email or password");
            }
            user = yield database_1.prismaClient.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    token: (0, uuid_1.v4)(),
                },
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    //logout
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.prismaClient.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    token: null,
                },
            });
            return "Logout Successful!";
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield database_1.prismaClient.user.findMany({
                orderBy: {
                    id: "asc",
                },
            });
            return users.map((user) => (0, user_model_1.toGetUserResponse)(user));
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield database_1.prismaClient.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(404, "User not found");
            }
            return (0, user_model_1.toGetUserResponse)(user);
        });
    }
}
exports.UserService = UserService;

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
exports.userMiddleware = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.get("X-API-TOKEN");
    if (token) {
        const user = yield database_1.prismaClient.user.findFirst({
            where: {
                token: token
            }
        });
        if (user) {
            req.user = user;
            next();
            return;
        }
    }
    next(new response_error_1.ResponseError(403, "You are forbidden from accessing this page"));
});
exports.userMiddleware = userMiddleware;

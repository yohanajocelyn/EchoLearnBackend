"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const user_middleware_1 = require("../middlewares/user-middleware");
exports.protectedRouter = express_1.default.Router();
exports.protectedRouter.use(user_middleware_1.userMiddleware);
exports.protectedRouter.delete("/api/user/logout", user_controller_1.UserController.logout);

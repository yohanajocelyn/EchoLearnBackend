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
exports.errorMiddleware = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../errors/response-error");
const errorMiddleware = (error, req, res, next
//next lanjut ke middleware/passing ke middleware
) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            errorMessage: `Validation error: ${JSON.stringify(error.message)}`,
        });
    }
    else if (error instanceof response_error_1.ResponseError) {
        res.status(400).json({
            errorMessage: error.message,
        });
    }
    else {
        res.status(500).json({
            errorMessage: error.message,
        });
    }
});
exports.errorMiddleware = errorMiddleware;

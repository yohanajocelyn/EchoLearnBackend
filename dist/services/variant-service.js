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
exports.VariantService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
const variant_model_1 = require("../models/variant-model");
const validation_1 = require("../validations/validation");
const variant_validation_1 = require("../validations/variant-validation");
class VariantService {
    static createVariant(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createReq = validation_1.Validation.validate(variant_validation_1.VariantValidation.CREATE, req);
            const song = yield database_1.prismaClient.song.findUnique({
                where: {
                    id: createReq.songId,
                }
            });
            if (!song) {
                throw new response_error_1.ResponseError(400, 'Song with id ${createReq.songId} not found');
            }
            const variant = yield database_1.prismaClient.variant.create({
                data: createReq,
            });
            return (0, variant_model_1.toVariantResponse)(variant);
        });
    }
}
exports.VariantService = VariantService;

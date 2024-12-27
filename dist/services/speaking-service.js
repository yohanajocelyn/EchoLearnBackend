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
exports.speakingService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
class speakingService {
    static checkUserAnswer(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAnswer = yield database_1.prismaClient.variant.findUnique({
                where: {
                    id: req.id,
                },
            });
            if (!checkAnswer) {
                throw new response_error_1.ResponseError(400, "Variant with id ${req.id} not found");
            }
            let isCorrect = false;
            if (checkAnswer.answer === req.answer) {
                isCorrect = true;
                const updateTotalScore = yield database_1.prismaClient.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        totalScore: user.totalScore + 10,
                    },
                });
            }
            else {
                isCorrect = false;
            }
            const createAttempt = yield database_1.prismaClient.attempt.create({
                data: {
                    userId: user.id,
                    variantId: req.id,
                    correctAnswer: checkAnswer.answer,
                    attemptedAnswer: req.answer,
                    score: 10,
                    attemptedAt: new Date(),
                    isComplete: isCorrect,
                },
            });
            if (isCorrect) {
                return "Your Answer is Correct";
            }
            else {
                return "Your Answer is Incorrect";
            }
        });
    }
}
exports.speakingService = speakingService;

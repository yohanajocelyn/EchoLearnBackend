import { User } from "@prisma/client";
import { UserRequest } from "../types/user-request";
import { SpeakingRequest } from "../models/variant-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { Validation } from "../validations/validation";
import { VariantValidation } from "../validations/variant-validation";
import { toAttemptResponse, toAttemptSpeakingResponse } from "../models/attempt-model";

export class speakingService {
  static async checkUserAnswer(user: User, req: SpeakingRequest) {
   const createReq = Validation.validate(
               VariantValidation.CHECK,
               req
           )
   
    const checkAnswer = await prismaClient.variant.findUnique({
      where: {
        id: createReq.id,
      },
    });
    if (!checkAnswer) {
      throw new ResponseError(400, "Variant with id ${req.id} not found");
    }
    let isCorrect = false;
    let scoreAttempt = 0
    if (checkAnswer.answer === createReq.answer) {
      isCorrect = true;
      const updateTotalScore = await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          totalScore: user.totalScore + 10,
        },
      });
      scoreAttempt = 10
    } else {
      isCorrect = false;
      scoreAttempt = 0
    }
    const createAttempt = await prismaClient.attempt.create({
      data: {
        userId: user.id,
        variantId: req.id,
        correctAnswer: checkAnswer.answer,
        attemptedAnswer: req.answer,
        score: scoreAttempt ,
        attemptedAt: new Date(),
        isComplete: isCorrect,
      },
    });
    if (isCorrect) {
      return toAttemptSpeakingResponse(createAttempt)
    } else {
      return toAttemptSpeakingResponse(createAttempt)
    }
  }
}

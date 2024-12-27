import { User } from "@prisma/client";
import { UserRequest } from "../types/user-request";
import { SpeakingRequest } from "../models/variant-model";
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";

export class speakingService {
  static async checkUserAnswer(user: User, req: SpeakingRequest) {
    const checkAnswer = await prismaClient.variant.findUnique({
      where: {
        id: req.id,
      },
    });
    if (!checkAnswer) {
      throw new ResponseError(400, "Variant with id ${req.id} not found");
    }
    let isCorrect = false;
    if (checkAnswer.answer === req.answer) {
      isCorrect = true;
      const updateTotalScore = await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          totalScore: user.totalScore + 10,
        },
      });
    } else {
      isCorrect = false;
    }
    const createAttempt = await prismaClient.attempt.create({
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
    }else {
        return "Your Answer is Incorrect";
    }
  }
}

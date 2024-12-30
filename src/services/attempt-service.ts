import { prismaClient } from "../application/database";
import { AttemptResponse, CreateAttemptRequest, toAttemptResponse } from "../models/attempt-model";
import { AttemptValidation } from "../validations/attempt-validation";
import { Validation } from "../validations/validation";

export class AttemptService {
    static async createAttempt(req: CreateAttemptRequest): Promise<AttemptResponse> {
        const createReq = Validation.validate(AttemptValidation.CREATE, req);

        const isComplete = createReq.isComplete === "true"

        const attempt = await prismaClient.attempt.create({
            data: {
                userId: Number(createReq.userId),
                variantId: Number(createReq.variantId),
                correctAnswer: createReq.correctAnswer,
                attemptedAnswer: createReq.attemptedAnswer,
                score: Number(createReq.score),
                attemptedAt: new Date(createReq.attemptedAt),
                isComplete: isComplete
            }
        });

        return toAttemptResponse(attempt);
    }
}
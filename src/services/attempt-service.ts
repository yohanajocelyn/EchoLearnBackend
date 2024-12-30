import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { AttemptResponse, CreateAttemptRequest, toAttemptResponse } from "../models/attempt-model";
import { AttemptValidation } from "../validations/attempt-validation";
import { Validation } from "../validations/validation";

export class AttemptService {
    static async createAttempt(req: CreateAttemptRequest, token: String): Promise<String> {
        const createReq = Validation.validate(AttemptValidation.CREATE, req);

        const isComplete = createReq.isComplete === "true"

        const user = await prismaClient.user.findFirst({
            where: {
                token: token.toString()
            }
        })

        if(!user){
            throw new ResponseError(400, "User is not logged in somehow");
        }

        const attempt = await prismaClient.attempt.create({
            data: {
                userId: user.id,
                variantId: Number(createReq.variantId),
                correctAnswer: createReq.correctAnswer,
                attemptedAnswer: createReq.attemptedAnswer,
                score: Number(createReq.score),
                attemptedAt: new Date(createReq.attemptedAt),
                isComplete: isComplete
            }
        });

        return "Data created successfully";
    }
}
import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { AdditionalAttemptDetail, AttemptResponse, CreateAttemptRequest, toAttemptAdditionalDataResponse, toAttemptResponse } from "../models/attempt-model";
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

    static async getAttempt(token: String, id: number): Promise<AttemptResponse> {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token.toString()
            }
        })

        if(!user){
            throw new ResponseError(400, "User is not logged in somehow");
        }

        const attempt = await prismaClient.attempt.findUnique({
            where: {
                id: id
            }
        })

        return toAttemptResponse(attempt!!)
    }

    static async getAttempts(token: String): Promise<AttemptResponse[]> {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token.toString()
            }
        })

        if(!user){
            throw new ResponseError(400, "User is not logged in somehow");
        }

        const attempts = await prismaClient.attempt.findMany({
            where: {
                userId: user.id
            }
        })

        return attempts.map(attempt => toAttemptResponse(attempt))
    }

    static async getAdditionalAttemptData(token: String, id: number): Promise<AdditionalAttemptDetail> {
        const attempt = await prismaClient.attempt.findUnique({
            where: {
                id: id
            }
        })

        if(!attempt){
            throw new ResponseError(400, "Attempt does not exist");
        }

        const variant = await prismaClient.variant.findUnique({
            where: {
                id: attempt.variantId
            }
        })

        if(!variant){
            throw new ResponseError(400, "Variant does not exist");
        }

        const song = await prismaClient.song.findUnique({
            where: {
                id: variant.songId
            }
        })

        return toAttemptAdditionalDataResponse(song!!, variant!!)
    }
}
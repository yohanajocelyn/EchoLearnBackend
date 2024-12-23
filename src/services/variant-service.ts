import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CreateVariantRequest, toVariantResponse, VariantResponse } from "../models/variant-model";
import { Validation } from "../validations/validation";
import { VariantValidation } from "../validations/variant-validation";

export class VariantService {
    static async createVariant(req: CreateVariantRequest): Promise<VariantResponse> {
        const createReq = Validation.validate(
            VariantValidation.CREATE,
            req
        )

        const song = await prismaClient.song.findUnique({
            where: {
                id: createReq.songId,
            }
        })

        if (!song) {
            throw new ResponseError(400, 'Song with id ${createReq.songId} not found')
        }

        const variant = await prismaClient.variant.create({
            data: createReq,
        })

        return toVariantResponse(variant)
    }
}
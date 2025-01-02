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

    static async getVariantBySongAndType(songId: number, type: string): Promise<VariantResponse[]> {
        const variants = await prismaClient.variant.findMany({
            where: {
                songId: songId,
                type: {
                    contains: type,
                    mode: 'insensitive'
                },
            }
        })

        if (!variants) {
            throw new ResponseError(404, 'Variant with songId ${songId} and type ${type} not found')
        }

        return variants.map((variant) => toVariantResponse(variant))
    }

    
}
import { Variant } from "@prisma/client";

export interface CreateVariantRequest {
    emptyLyric: string;
    answer: string;
    songId: number;
    type: string;
}

export interface VariantResponse {
    id: number;
    emptyLyric: string;
    answer: string;
    songId?: number;
    type: string;
}

export function toVariantResponse(variant: Variant): VariantResponse {
    return {
        id: variant.id,
        emptyLyric: variant.emptyLyric,
        answer: variant.answer,
        songId: variant.songId,
        type: variant.type
    }
}
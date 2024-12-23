import { Variant } from "@prisma/client";

export interface CreateVariantRequest {
    emptyLyric: string;
    answer: string;
    songId: number;
}

export interface VariantResponse {
    id: number;
    emptyLyric: string;
    answer: string;
    songId?: number;
}

export function toVariantResponse(variant: Variant): VariantResponse {
    return {
        id: variant.id,
        emptyLyric: variant.emptyLyric,
        answer: variant.answer,
        songId: variant.songId,
    }
}
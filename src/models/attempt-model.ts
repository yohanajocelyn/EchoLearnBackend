import { Song, Variant } from "@prisma/client";

export interface CreateAttemptRequest {
    variantId: string;
    correctAnswer: string;
    attemptedAnswer: string;
    score: string;
    attemptedAt: string;
    isComplete: string;
}

export interface AttemptResponse {
    id: number;
    userId: number;
    variantId: number;
    correctAnswer: string;
    attemptedAnswer: string;
    score: number;
    attemptedAt: Date;
    isComplete: boolean;
}

export interface AdditionalAttemptDetail{
    songId: number;
    songTitle: string;
    artist: string;
    type: string;
    variantId: number
}

export function toAttemptResponse(attempt: AttemptResponse): AttemptResponse {
    return {
        id: attempt.id,
        userId: attempt.userId,
        variantId: attempt.variantId,
        correctAnswer: attempt.correctAnswer,
        attemptedAnswer: attempt.attemptedAnswer,
        score: attempt.score,
        attemptedAt: attempt.attemptedAt,
        isComplete: attempt.isComplete,
    }
}

export function toAttemptAdditionalDataResponse(song: Song, variant: Variant): AdditionalAttemptDetail {
    return {
        songId: song.id,
        songTitle: song.title,
        artist: song.artist,
        type: variant.type,
        variantId: variant.id
    }
}
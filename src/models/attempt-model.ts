import { Attempt, Song, Variant } from "@prisma/client";
import { AttemptVariantDetail } from "./variant-model";
import { AttemptSongDetail } from "./song-model";

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
    song?: Song;
    variant?: Variant
}

export interface UpdateAttemptRequest {
    attemptedAnswer: string;
    score: string;
    attemptedAt: string;
    isComplete: string;
}

export interface AttemptDetail{
    id: number;
    score: number;
    attemptedAt: Date;
    isComplete: boolean;
    variant: AttemptVariantDetail;
    song: AttemptSongDetail;
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

export function toAttemptDetail(attempt: (Attempt & {variant: Variant & {song: Song}})): AttemptDetail {
    return {
        id: attempt.id,
        score: attempt.score,
        attemptedAt: attempt.attemptedAt,
        isComplete: attempt.isComplete,
        variant: {
            type: attempt.variant.type
        },
        song: {
            title: attempt.variant.song.title,
            artist: attempt.variant.song.artist
        }
    }
}

export function toFullAttemptResponse(attempt: (Attempt & {variant: Variant & {song: Song}})): AttemptResponse {
    return {
        id: attempt.id,
        userId: attempt.userId,
        variantId: attempt.variantId,
        correctAnswer: attempt.correctAnswer,
        attemptedAnswer: attempt.attemptedAnswer,
        score: attempt.score,
        attemptedAt: attempt.attemptedAt,
        isComplete: attempt.isComplete,
        song: attempt.variant.song,
        variant: attempt.variant
    }
}

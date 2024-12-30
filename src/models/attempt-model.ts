export interface CreateAttemptRequest {
    userId: string;
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
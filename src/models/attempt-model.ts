export interface CreateAttemptRequest {
    userId: number;
    variantId: number;
    correctAnswer: string;
    attemptedAnswer: string;
    score: number;
    attemptedAt: Date;
    isComplete: boolean;
}
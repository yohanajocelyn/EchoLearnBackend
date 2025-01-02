import { Attempt } from "@prisma/client";

export interface CreateAttemptRequest {
  userId: number;
  variantId: number;
  correctAnswer: string;
  attemptedAnswer: string;
  score: number;
  attemptedAt: Date;
  isComplete: boolean;
}

export interface AttemptResponse {
  userId: number;
  variantId: number;
  correctAnswer: string;
  attemptedAnswer: string;
  score: number;
  attemptedAt: Date;
  isComplete: boolean;
}

export function toAttemptResponse(attempt: Attempt): AttemptResponse {
  return {
    userId: attempt.userId,
    variantId: attempt.variantId,
    correctAnswer: attempt.correctAnswer,
    attemptedAnswer: attempt.attemptedAnswer,
    score: attempt.score,
    attemptedAt: attempt.attemptedAt,
    isComplete: attempt.isComplete,
  };
}

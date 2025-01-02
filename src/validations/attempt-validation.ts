import { z, ZodType } from "zod";

export class AttemptValidation {
    static readonly CREATE: ZodType = z.object({
        variantId: z.string().regex(/^\d+$/),
        correctAnswer: z.string(),
        attemptedAnswer: z.string(),
        score: z.string().regex(/^\d+$/),
        attemptedAt: z.string(),
        isComplete: z.string()
    })
}
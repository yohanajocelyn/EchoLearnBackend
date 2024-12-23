import { any, z, ZodType } from "zod";

export class VariantValidation {
    static readonly CREATE: ZodType = z.object({
        emptyLyric: z.string(),
        answer: z.string(),
        songId: z.number(),
    })
}
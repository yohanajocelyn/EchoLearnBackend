import { z, ZodType } from "zod";

export class NoteValidation {
    static readonly CREATE: ZodType = z.object({
        word: z.string(),
        meaning: z.string()
    })
}
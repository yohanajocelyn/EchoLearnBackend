import { z, ZodType } from "zod";

export class SongValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        artist: z.string().min(1).max(100),
        genre: z.string().min(1).max(100),
        image: z.string().min(1).max(100),
        lyrics: z.string(),
    })
}
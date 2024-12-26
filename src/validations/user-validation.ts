import { z, ZodType } from "zod";

export class UserValidation {
    static readonly REGISTER: ZodType = z.object({
        email: z.string().min(1).max(150),
        username: z.string().min(1).max(100),
        password: z.string().min(1).max(100),
        profilePicture: z.string().min(1).max(100)
    })
    
    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(150),
        password: z.string().min(1).max(100)
    })
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongValidation = void 0;
const zod_1 = require("zod");
class SongValidation {
}
exports.SongValidation = SongValidation;
SongValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    artist: zod_1.z.string().min(1).max(100),
    genre: zod_1.z.string().min(1).max(100),
    image: zod_1.z.string().min(1).max(100),
    lyrics: zod_1.z.string(),
});

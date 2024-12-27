"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantValidation = void 0;
const zod_1 = require("zod");
class VariantValidation {
}
exports.VariantValidation = VariantValidation;
VariantValidation.CREATE = zod_1.z.object({
    emptyLyric: zod_1.z.string(),
    answer: zod_1.z.string(),
    songId: zod_1.z.number(),
    type: zod_1.z.string()
});

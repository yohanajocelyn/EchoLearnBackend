"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toVariantResponse = toVariantResponse;
function toVariantResponse(variant) {
    return {
        id: variant.id,
        emptyLyric: variant.emptyLyric,
        answer: variant.answer,
        songId: variant.songId,
        type: variant.type
    };
}

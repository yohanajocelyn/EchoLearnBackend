"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSongResponse = toSongResponse;
function toSongResponse(song) {
    return {
        id: song.id,
        title: song.title,
        artist: song.artist,
        genre: song.genre,
        image: song.image,
        lyrics: song.lyrics,
        fileName: song.fileName,
        variants: song.variants ? song.variants.map((variant) => ({
            id: variant.id,
            emptyLyric: variant.emptyLyric,
            answer: variant.answer,
            type: variant.type
        })) : []
    };
}

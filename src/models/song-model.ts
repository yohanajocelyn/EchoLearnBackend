import { Song, Variant } from "@prisma/client";
import { VariantResponse } from "./variant-model";

export interface CreateSongRequest {
    title: string;
    artist: string;
    genre: string;
    image: string;
    lyrics: string;
    fileName: string;
}

export interface SongResponse {
    id: number;
    title: string;
    artist: string;
    genre: string;
    image: string;
    lyrics: string;
    fileName: string;
    variants: VariantResponse[];
}

export interface searchSongRequest {    
    keyword: string;
}

export function toSongResponse(song: (Song & {variants?: Variant[]})): SongResponse {
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
        })): []
    }
}


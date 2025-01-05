export interface CreateNoteRequest {
    word: string;
    meaning: string;
}

export interface NoteResponse {
    id: number;
    word: string;
    meaning: string;
}

export function toNoteResponse(note: NoteResponse): NoteResponse {
    return {
        id: note.id,
        word: note.word,
        meaning: note.meaning
    }
}
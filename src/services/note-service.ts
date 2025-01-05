import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import { CreateNoteRequest, NoteResponse, toNoteResponse } from "../models/note-model";
import { NoteValidation } from "../validations/note-validation";
import { Validation } from "../validations/validation";

export class NoteService {
    static async createNote(token: String, req: CreateNoteRequest): Promise<String> {
        const createReq = Validation.validate(NoteValidation.CREATE, req);

        const user = await prismaClient.user.findFirst({
            where: {
                token: token.toString()
            }
        })

        if(!user){
            throw new ResponseError(400, "User is not logged in somehow");
        }

        const note = await prismaClient.note.create({
            data: {
                word: createReq.word,
                meaning: createReq.meaning,
                userId: user.id
            }
        })

        return "Data created successfully";
    }

    static async getNotes(token: String): Promise<NoteResponse[]> {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token.toString()
            }
        })

        if(!user){
            throw new ResponseError(400, "User is not logged in somehow");
        }

        const notes = await prismaClient.note.findMany({
            where: {
                userId: user.id
            }
        })

        return notes.map(note => toNoteResponse(note))
    }

    static async getNote(token: String, id: number): Promise<NoteResponse> {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token.toString()
            }
        })

        if(!user){
            throw new ResponseError(400, "User is not logged in somehow");
        }

        const note = await prismaClient.note.findUnique({
            where: {
                id: id
            }
        })

        return toNoteResponse(note!!)
    }

    static async deleteNote(token: String, id: number): Promise<String> {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token.toString()
            }
        })

        if(!user){
            throw new ResponseError(400, "User is not logged in somehow");
        }

        const note = await prismaClient.note.delete({
            where: {
                id: id
            }
        })

        return "Data deleted successfully";
    }

    static async updateNote(token: String, id: number, req: CreateNoteRequest): Promise<String> {
        const createReq = Validation.validate(NoteValidation.CREATE, req);

        const user = await prismaClient.user.findFirst({
            where: {
                token: token.toString()
            }
        })

        if(!user){
            throw new ResponseError(400, "User is not logged in somehow");
        }

        const note = await prismaClient.note.update({
            where: {
                id: id
            },
            data: {
                word: createReq.word,
                meaning: createReq.meaning
            }
        })

        return "Data updated successfully";
    }
}
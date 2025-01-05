import { NextFunction, Request, Response } from "express";
import { CreateNoteRequest, NoteResponse } from "../models/note-model";
import { NoteService } from "../services/note-service";

export class NoteController{
    static async createNote(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const request: CreateNoteRequest = req.body as CreateNoteRequest;
            const response: String = await NoteService.createNote(String(req.headers["x-api-token"]), request);

            res.status(200).json({
                data: response,
              });
        }catch(error){
            next(error);
        }
    }

    static async getNotes(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const response: NoteResponse[] = await NoteService.getNotes(String(req.headers["x-api-token"]));

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }
    
    static async getNote(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const id: number = Number(req.params.noteId);
            const response: NoteResponse = await NoteService.getNote(String(req.headers["x-api-token"]), id);

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }

    static async deleteNote(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const id: number = Number(req.params.noteId);
            const response: String = await NoteService.deleteNote(String(req.headers["x-api-token"]), id);

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }

    static async updateNote(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const id: number = Number(req.params.noteId);
            const request: CreateNoteRequest = req.body as CreateNoteRequest;
            const response: String = await NoteService.updateNote(String(req.headers["x-api-token"]), id, request);

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }
}
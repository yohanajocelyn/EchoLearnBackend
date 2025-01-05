import { NextFunction, Request, Response } from "express";
import { CreateNoteRequest, NoteResponse } from "../models/note-model";
import { NoteService } from "../services/note-service";
import { UserRequest } from "../types/user-request";

export class NoteController{
    static async createNote(
        req: UserRequest, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const request: CreateNoteRequest = req.body as CreateNoteRequest;
            const response: String = await NoteService.createNote(req.params.username as string, request);

            res.status(200).json({
                data: response,
              });
        }catch(error){
            next(error);
        }
    }

    static async getNotes(
        req: UserRequest, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const response: NoteResponse[] = await NoteService.getNotes(req.params.username as string);

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }
    
    static async getNote(
        req: UserRequest, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const id: number = Number(req.params.noteId);
            const response: NoteResponse = await NoteService.getNote(req.params.username as string, id);

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }

    static async deleteNote(
        req: UserRequest, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const id: number = Number(req.params.noteId);
            const response: String = await NoteService.deleteNote(req.params.username as string, id);

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
            const response: String = await NoteService.updateNote(req.params.username as string, id, request);

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }
}
import { NextFunction, Request, Response } from "express";
import { AttemptDetail, AttemptResponse, CreateAttemptRequest } from "../models/attempt-model";
import { AttemptService } from "../services/attempt-service";

export class AttemptController{
    static async createAttempt(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const request: CreateAttemptRequest = req.body as CreateAttemptRequest;
            const response: String = await AttemptService.createAttempt(request, String(req.headers["x-api-token"]));

            res.status(200).json({
                data: response,
              });
        }catch(error){
            next(error);
        }
    }

    static async getAttempt(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const id: number = Number(req.params.attemptId);
            const response: AttemptResponse = await AttemptService.getAttempt(String(req.headers["x-api-token"]), id);

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }

    static async getAttempts(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const response: AttemptResponse[] = await AttemptService.getAttempts(String(req.headers["x-api-token"]));

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }

    static async getAttemptDetail(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const response: AttemptDetail[] = await AttemptService.getAttemptDetail(String(req.headers["x-api-token"]));

            res.status(200).json({
                data: response,
            });
        }catch(error){
            next(error);
        }
    }
}
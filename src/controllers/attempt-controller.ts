import { NextFunction, Request, Response } from "express";
import { AttemptResponse, CreateAttemptRequest } from "../models/attempt-model";
import { AttemptService } from "../services/attempt-service";

export class AttemptController{
    static async createAttempt(
        req: Request, 
        res: Response, 
        next: NextFunction
    ){
        try{
            const request: CreateAttemptRequest = req.body as CreateAttemptRequest;
            const response: AttemptResponse = await AttemptService.createAttempt(request, String(req.headers["X-API-TOKEN"]));

            res.status(200).json({
                data: response,
              });
        }catch(error){
            next(error);
        }
    }
}
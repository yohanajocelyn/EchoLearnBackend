import { NextFunction, Request, Response } from "express";
import { CreateVariantRequest, VariantResponse } from "../models/variant-model";
import { VariantService } from "../services/variant-service";

export class VariantController {
    static async createVariant(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateVariantRequest = req.body as CreateVariantRequest;
            const response: VariantResponse = await VariantService.createVariant(request);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
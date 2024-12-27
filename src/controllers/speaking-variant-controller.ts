import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../types/user-request";
import { SpeakingRequest } from "../models/variant-model";
import { speakingService } from "../services/speaking-service";

export class SpeakingVariantController {
  static async checkAnswer(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const request = req.body as SpeakingRequest;
      request.id = parseInt(req.params.id);
      const response = await speakingService.checkUserAnswer(
        req.user!,
        request
      );

      res.status(201).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}

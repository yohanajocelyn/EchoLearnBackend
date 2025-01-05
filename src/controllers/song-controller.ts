import { NextFunction, Request, Response } from "express";
import {
  CreateSongRequest,
  searchSongRequest,
  SongResponse,
} from "../models/song-model";
import { SongService } from "../services/song-service";
import { UserRequest } from "../types/user-request";
import { ResponseError } from "../errors/response-error";

export class SongController {
  static async createSong(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateSongRequest = req.body as CreateSongRequest;
      const response: SongResponse = await SongService.createSong(request);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSongs(req: Request, res: Response, next: NextFunction) {
    try {
      const response: SongResponse[] = await SongService.getSongs();


      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const updatedResponse = response.map((song) => ({
        ...song,
        image: `${baseUrl}/${song.image}`,
        fileName: `${baseUrl}/${song.fileName}`,
      }));

      res.status(200).json({
        data: updatedResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSong(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.songId);
      const response: SongResponse = await SongService.getSong(id);

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      response.image = `${baseUrl}/${response.image}`;
      response.fileName = `${baseUrl}/${response.fileName}`;

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getSongByGenre(req: Request, res: Response, next: NextFunction) {
    try {
      const response: SongResponse[] = await SongService.getSongByGenre(
        String(req.params.genre)
      );

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const updatedResponse = response.map((song) => ({
        ...song,
        image: `${baseUrl}/${song.image}`,
        fileName: `${baseUrl}/${song.fileName}`,
      }));

      res.status(200).json({
        data: updatedResponse,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSong(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateSongRequest = req.body as CreateSongRequest;
      const response: SongResponse = await SongService.updateSong(
        Number(req.params.songId),
        request
      );

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSong(req: Request, res: Response, next: NextFunction) {
    try {
      const id: number = Number(req.params.songId);
      const response: String = await SongService.deleteSong(id);

      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchSong(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const query = req.params.keyword as string;
  
      if (!query) {
        throw new ResponseError(400, "Search keyword is required");
      }
  
      const response = await SongService.searchSong(req.user!!,query);
      
      res.status(200).json({
        data: response,
        "count" : query
      });
    
    } catch (error) {
      next(error);
    }
  }
  
}

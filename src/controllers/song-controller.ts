import { NextFunction, Request, Response } from "express";
import { CreateSongRequest, SearchSongRequest, SongResponse } from "../models/song-model";
import { SongService } from "../services/song-service";
import { UserRequest } from "../types/user-request";

export class SongController {
    static async createSong(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateSongRequest = req.body as CreateSongRequest;
            const response: SongResponse = await SongService.createSong(request);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getSongs(req: Request, res: Response, next: NextFunction) {
        try {
            const response: SongResponse[] = await SongService.getSongs();

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async getSong(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.songId);
            const response: SongResponse = await SongService.getSong(id);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteSong(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.songId);
            const response: String = await SongService.deleteSong(id);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }

    static async searchSong(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { keyword } = req.body as SearchSongRequest;
            const response: SongResponse[] = await SongService.searchSong(keyword);

            res.status(200).json({
                data: response
            })
        } catch (error) {
            next(error)
        }
    }
}
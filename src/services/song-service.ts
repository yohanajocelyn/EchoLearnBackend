import { prismaClient } from "../application/database";
import { ResponseError } from "../errors/response-error";
import {
  CreateSongRequest,
  SongResponse,
  toSongResponse,
} from "../models/song-model";
import { SongValidation } from "../validations/song-validation";
import { Validation } from "../validations/validation";

export class SongService {
  static async createSong(req: CreateSongRequest): Promise<SongResponse> {
    const createReq = Validation.validate(SongValidation.CREATE, req);

    const song = await prismaClient.song.create({
      data: createReq,
    });

    return toSongResponse(song);
  }

  static async getSongs(): Promise<SongResponse[]> {
    const songs = await prismaClient.song.findMany();

    if (!songs) {
      throw new ResponseError(400, "No songs found");
    }

    return songs.map((song) => toSongResponse(song));
  }

  static async getSong(id: number): Promise<SongResponse> {
    const song = await prismaClient.song.findUnique({
      where: {
        id: id,
      },
    });

    if (!song) {
      throw new ResponseError(400, "Song with id ${id} not found");
    }

    return toSongResponse(song);
  }

  static async deleteSong(id: number): Promise<String> {
    const song = await prismaClient.song.findUnique({
      where: {
        id: id,
      },
    });

    if (!song) {
      throw new ResponseError(400, "Song with id ${id} not found");
    }

    await prismaClient.song.delete({
      where: {
        id: id,
      },
    });

    return "Song with id ${id} deleted";
  }
}

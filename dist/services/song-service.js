"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../errors/response-error");
const song_model_1 = require("../models/song-model");
const song_validation_1 = require("../validations/song-validation");
const validation_1 = require("../validations/validation");
class SongService {
    static createSong(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const createReq = validation_1.Validation.validate(song_validation_1.SongValidation.CREATE, req);
            const song = yield database_1.prismaClient.song.create({
                data: createReq,
            });
            return (0, song_model_1.toSongResponse)(song);
        });
    }
    static getSongs() {
        return __awaiter(this, void 0, void 0, function* () {
            const songs = yield database_1.prismaClient.song.findMany();
            if (!songs) {
                throw new response_error_1.ResponseError(400, "No songs found");
            }
            return songs.map((song) => (0, song_model_1.toSongResponse)(song));
        });
    }
    static getSong(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const song = yield database_1.prismaClient.song.findUnique({
                where: {
                    id: id,
                },
            });
            if (!song) {
                throw new response_error_1.ResponseError(400, "Song with id ${id} not found");
            }
            return (0, song_model_1.toSongResponse)(song);
        });
    }
    static deleteSong(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const song = yield database_1.prismaClient.song.findUnique({
                where: {
                    id: id,
                },
            });
            if (!song) {
                throw new response_error_1.ResponseError(400, "Song with id ${id} not found");
            }
            yield database_1.prismaClient.song.delete({
                where: {
                    id: id,
                },
            });
            return "Song with id ${id} deleted";
        });
    }
}
exports.SongService = SongService;

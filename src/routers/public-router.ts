import express from "express"
import { SongController } from "../controllers/song-controller"

export const publicRouter = express.Router()

//Song routes
publicRouter.post('/songs', SongController.createSong)
publicRouter.get('/songs', SongController.getSongs)
publicRouter.get('/songs/:songId', SongController.getSong)
publicRouter.delete('/songs/:songId', SongController.deleteSong)
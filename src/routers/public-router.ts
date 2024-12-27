import express from "express"
import { SongController } from "../controllers/song-controller"
import { UserController } from "../controllers/user-controller"
import { VariantController } from "../controllers/variant-controller"

export const publicRouter = express.Router()

//Song routes
publicRouter.post('/songs', SongController.createSong)
publicRouter.get('/songs', SongController.getSongs)
publicRouter.get('/songs/:songId', SongController.getSong)
publicRouter.delete('/songs/:songId', SongController.deleteSong)

//Variant routes
publicRouter.post('/variants', VariantController.createVariant)

//User routes
publicRouter.post('/api/users/register', UserController.register)
publicRouter.post('/api/users/login', UserController.login)
import express from "express"
import { SongController } from "../controllers/song-controller"
import { UserController } from "../controllers/user-controller"
import { VariantController } from "../controllers/variant-controller"
import { FileController } from "../controllers/file-controller"

export const publicRouter = express.Router()

//Song routes
publicRouter.post('/api/songs', SongController.createSong)
publicRouter.get('/api/songs', SongController.getSongs)
publicRouter.get('/api/songs/:songId(\\d+)', SongController.getSong)
publicRouter.get('/api/songs/:genre', SongController.getSongByGenre)
publicRouter.put('/api/songs/:songId(\\d+)', SongController.updateSong)
publicRouter.delete('/api/songs/:songId(\\d+)', SongController.deleteSong)
//Variant routes
publicRouter.post('/api/variants', VariantController.createVariant)

//User routes
publicRouter.post('/api/user/register', UserController.register)
publicRouter.post('/api/user/login', UserController.login)
publicRouter.get('/api/user', UserController.getAllUsers)

//Image routes
publicRouter.get('/api/default-profile-pictures', (FileController.getDefaultProfilePictures))



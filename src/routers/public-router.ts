import express from "express"
import { SongController } from "../controllers/song-controller"
import { UserController } from "../controllers/user-controller"
import { VariantController } from "../controllers/variant-controller"
import { FileController } from "../controllers/file-controller"

export const publicRouter = express.Router()

//Song routes
publicRouter.post('/songs', SongController.createSong)
publicRouter.get('/songs', SongController.getSongs)
publicRouter.get('/songs/:songId', SongController.getSong)
publicRouter.delete('/songs/:songId', SongController.deleteSong)

//Variant routes
publicRouter.post('/variants', VariantController.createVariant)

//User routes
publicRouter.post('/api/user/register', UserController.register)
publicRouter.post('/api/user/login', UserController.login)
publicRouter.get('/api/user', UserController.getAllUsers)
publicRouter.get('/api/user/:userId', UserController.getUserById)

//Image routes
publicRouter.get('/api/default-profile-pictures', (FileController.getDefaultProfilePictures))

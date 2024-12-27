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
publicRouter.post('/api/user/register', UserController.register)
publicRouter.post('/api/user/login', UserController.login)
publicRouter.get('/api/user', UserController.getAllUsers)
publicRouter.get('/api/user/:userId', UserController.getUserById)

//Image routes
publicRouter.get('/api/default-profile-pictures', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const profilePictures = [
        `${baseUrl}/public/images/profilePicture1.jpg`,
        `${baseUrl}/public/images/profilePicture2.jpg`,
        `${baseUrl}/public/images/profilePicture3.jpg`,
        `${baseUrl}/public/images/profilePicture4.jpg`,
    ];
    res.json(profilePictures);
});
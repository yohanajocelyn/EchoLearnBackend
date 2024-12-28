"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const song_controller_1 = require("../controllers/song-controller");
const user_controller_1 = require("../controllers/user-controller");
const variant_controller_1 = require("../controllers/variant-controller");
exports.publicRouter = express_1.default.Router();
//Song routes
exports.publicRouter.post('/songs', song_controller_1.SongController.createSong);
exports.publicRouter.get('/songs', song_controller_1.SongController.getSongs);
exports.publicRouter.get('/songs/:songId', song_controller_1.SongController.getSong);
exports.publicRouter.delete('/songs/:songId', song_controller_1.SongController.deleteSong);
//Variant routes
exports.publicRouter.post('/variants', variant_controller_1.VariantController.createVariant);
//User routes
exports.publicRouter.post('/api/user/register', user_controller_1.UserController.register);
exports.publicRouter.post('/api/user/login', user_controller_1.UserController.login);
exports.publicRouter.get('/api/user', user_controller_1.UserController.getAllUsers);
exports.publicRouter.get('/api/user/:userId', user_controller_1.UserController.getUserById);

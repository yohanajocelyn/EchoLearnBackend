import express from "express"
import { UserController } from "../controllers/user-controller"
import { userMiddleware } from "../middlewares/user-middleware"

export const protectedRouter = express.Router()
protectedRouter.use(userMiddleware)

protectedRouter.delete("/api/user/logout", UserController.logout)
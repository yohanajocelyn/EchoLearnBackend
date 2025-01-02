import express from "express"
import { UserController } from "../controllers/user-controller"
import { userMiddleware } from "../middlewares/user-middleware"
import { SpeakingVariantController } from "../controllers/speaking-variant-controller"

export const protectedRouter = express.Router()
protectedRouter.use(userMiddleware)

protectedRouter.delete("/api/user/logout", UserController.logout)


//speaking route
protectedRouter.post("/api/user/speaking/:variantId(\\d+)", SpeakingVariantController.checkAnswer)

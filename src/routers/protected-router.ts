import express from "express"
import { UserController } from "../controllers/user-controller"
import { userMiddleware } from "../middlewares/user-middleware"
import { SpeakingVariantController } from "../controllers/speaking-variant-controller"
=======
import { AttemptController } from "../controllers/attempt-controller"

export const protectedRouter = express.Router()
protectedRouter.use(userMiddleware)

protectedRouter.delete("/api/user/logout", UserController.logout)


protectedRouter.post("/api/user/speaking/:variantId(\\d+)", SpeakingVariantController.checkAnswer)
protectedRouter.post("/api/attempt", AttemptController.createAttempt)
protectedRouter.get("/api/attempt/:attemptId", AttemptController.getAttempt)
protectedRouter.get("/api/attempts", AttemptController.getAttempts)
protectedRouter.get("/api/attempts-detail", AttemptController.getAttemptDetail)

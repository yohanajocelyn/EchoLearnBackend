import express from "express"
import { UserController } from "../controllers/user-controller"
import { userMiddleware } from "../middlewares/user-middleware"
import { AttemptController } from "../controllers/attempt-controller"
import { VariantController } from "../controllers/variant-controller"

export const protectedRouter = express.Router()
protectedRouter.use(userMiddleware)

protectedRouter.delete("/api/user/logout", UserController.logout)
protectedRouter.post("/api/attempt", AttemptController.createAttempt)
protectedRouter.get("/api/attempt/:attemptId", AttemptController.getAttempt)
protectedRouter.get("/api/attempts", AttemptController.getAttempts)
<<<<<<< Updated upstream
protectedRouter.get("/api/attempts-detail", AttemptController.getAttemptDetail)
=======
protectedRouter.get("/api/attempts-detail", AttemptController.getAttemptDetail)
protectedRouter.get("/api/variants/attempt/:variantId(\\d+)", VariantController.getVariantById)
protectedRouter.get('/api/variants/:songId(\\d+)/:type', VariantController.getVariantBySongAndType)
>>>>>>> Stashed changes

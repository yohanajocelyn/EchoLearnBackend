import express from 'express';
import { publicRouter } from '../routers/public-router';
import { errorMiddleware } from '../middlewares/error-middleware';

const app = express();
app.use(express.json());
app.use(publicRouter)
app.use(errorMiddleware)

export default app;
import express from 'express';
import { publicRouter } from '../routers/public-router';
import { errorMiddleware } from '../middlewares/error-middleware';
import { userMiddleware } from '../middlewares/user-middleware';
import { protectedRouter } from '../routers/protected-router';

const app = express();
app.use(express.json());

//for serving images
app.use('/public', express.static('public'));

app.use(publicRouter)
app.use(protectedRouter)
app.use(errorMiddleware)

export default app;
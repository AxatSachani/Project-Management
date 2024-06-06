import express, { NextFunction, Request, Response } from 'express';
import config from './config';
import routes from './routes/index';
import { errorHandler } from './middleware/errorHandler';
import { messages } from './helper/messages';
import connectDB from './database/database';
import seedUsers from './seeders';

const app = express();

app.use(express.json());

// handle cors
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
})


// attach all routes
app.use('/api', routes);


// server health check api
app.get('/api/health', async (req: Request, res: Response) => {
    res.status(200).send({ status: "pong" });
});


// handle unregistered routes
app.use("*", async (req: Request, res: Response) => {
    res.status(404).json({ code: 404, status: false, error: messages.methodNotFound });
});

// error handling middleware
app.use(errorHandler);

// database connection 
connectDB()

// create a users
seedUsers()

//server start
app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});
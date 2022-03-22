import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
/* import userRoutes from './routes/user.routes.js';  */
import routes from './routes/index.js';


const app = express();

dotenv.config()

/**
 * Database setup
 */
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true
  }
);


app.use(cors());
app.use(express.json());
app.use(routes) 

export default app;

import express from 'express';
import cors from 'cors';
/* import userRoutes from './routes/user.routes.js';  */
import routes from './routes/index.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(routes) 

export default app;

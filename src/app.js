import express from 'express';
/* import userRoutes from './routes/user.routes.js';  */
import routes from './routes/index.js';


const app = express();
/* app.use(userRoutes) */
app.use(express.json());
app.use(routes) 

export default app;

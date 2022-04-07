import { Router } from 'express';
import plannerRoutes from './planner.routes.js';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';

const routes = Router();

routes.use('/', userRoutes);
routes.use('/', plannerRoutes);
routes.use('/', authRoutes);

export default routes;

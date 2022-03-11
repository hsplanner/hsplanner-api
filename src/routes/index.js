import { Router } from 'express';
import plannerRoutes from './planner.routes.js';
import userRoutes from './user.routes.js';

const routes = Router();

routes.use('/', userRoutes);
routes.use('/', plannerRoutes);

export default routes;

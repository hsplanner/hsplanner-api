import { Router } from 'express';
import {getAll, getOne, store} from '../controllers/Planner/index.js';

const plannerRoutes = Router();

plannerRoutes.get('/planner', getAll)
plannerRoutes.post('/planner', store)
plannerRoutes.get('/planner/:id', getOne)

export default plannerRoutes;

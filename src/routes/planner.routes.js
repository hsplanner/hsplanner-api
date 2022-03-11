import { Router } from 'express';
import {getAll, getOne} from '../controllers/Planner/index.js';

const plannerRoutes = Router();

plannerRoutes.get('/planner', getAll)
plannerRoutes.get('/planner/1', getOne)

export default plannerRoutes;

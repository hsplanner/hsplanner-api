import { Router } from 'express';
import {getAll, getOne, store, getAllUser} from '../controllers/Planner/index.js';

const plannerRoutes = Router();

plannerRoutes.get('/planner', getAll)
plannerRoutes.post('/planner', store)
plannerRoutes.get('/planner/:id', getOne)
plannerRoutes.get('/planners/:userId', getAllUser)


export default plannerRoutes;

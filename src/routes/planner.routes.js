import { Router } from 'express';
import {getAll, getOne, store, getAllUser, update} from '../controllers/Planner/index.js';

const plannerRoutes = Router();

plannerRoutes.get('/planners', getAll)
plannerRoutes.post('/planner', store)
plannerRoutes.get('/planner/:id', getOne)
plannerRoutes.get('/planners/:userId', getAllUser)
plannerRoutes.patch('/planner', update)



export default plannerRoutes;

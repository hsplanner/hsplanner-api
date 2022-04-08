import { Router } from 'express';
import {getAll, getOne, store, getAllUser, updateWithEvent} from '../controllers/Planner/index.js';

const plannerRoutes = Router();

plannerRoutes.get('/planner', getAll)
plannerRoutes.post('/planner', store)
plannerRoutes.get('/planner/:id', getOne)
plannerRoutes.get('/planners/:userId', getAllUser)
plannerRoutes.post('/event/', updateWithEvent)



export default plannerRoutes;

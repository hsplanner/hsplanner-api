import { Router } from 'express';
import {getAll, getOne, store, getAllUser, update, deletEvent} from '../controllers/Planner/index.js';

const plannerRoutes = Router();

plannerRoutes.get('/planners', getAll)
plannerRoutes.post('/planner', store)
plannerRoutes.get('/planner/:id', getOne)
plannerRoutes.get('/planners/:idUser', getAllUser)
plannerRoutes.patch('/planner', update)
plannerRoutes.delete('/planner/event', deletEvent)



export default plannerRoutes;

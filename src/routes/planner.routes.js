import { Router } from 'express';
import {getAll, getOne, store, getAllUser, 
        update, deletEvent, postCopyPlanner,
        updatePlanner, updateEvent} from '../controllers/Planner/index.js';

const plannerRoutes = Router();

plannerRoutes.get('/planners', getAll)
plannerRoutes.get('/planner/:id', getOne)
plannerRoutes.get('/planners/:idUser', getAllUser)

plannerRoutes.patch('/planner', update)
plannerRoutes.patch('/planner/:plannerId', updatePlanner);
plannerRoutes.patch('/event/:plannerId', updateEvent)

plannerRoutes.delete('/planner/event', deletEvent)

plannerRoutes.post('/planner', store)
plannerRoutes.post('/planner/:plannerId', postCopyPlanner)




export default plannerRoutes;

import { Router } from 'express';
import { create, getAll, getOneUsername, getAllStudentOfTutor } from '../controllers/User/index.js';

const userRoutes = Router();

userRoutes.get('/users', getAll);
userRoutes.get('/users/:idTutor', getAllStudentOfTutor)
userRoutes.get('/user/:username', getOneUsername);
userRoutes.post('/user', create);

export default userRoutes;

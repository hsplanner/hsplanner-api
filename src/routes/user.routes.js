import { Router } from 'express';
import { create, getAll, getOneUsername,
         getAllStudentOfTutor, getStudentsByUsername,
         patchEstudentExist } from '../controllers/User/index.js';

const userRoutes = Router();

userRoutes.get('/users', getAll);
userRoutes.get('/users/:idTutor', getAllStudentOfTutor)
userRoutes.get('/user/:username', getOneUsername);
userRoutes.get('/student/:username', getStudentsByUsername)
userRoutes.post('/user', create)
userRoutes.patch('/user/:username', patchEstudentExist);


export default userRoutes;

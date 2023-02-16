import { Router } from 'express';
import { create, getAll, getOneUsername,
         getAllStudentOfTutor, getStudentsByUsername,
         patchEstudentExist, getTutoresForStudents,
         patchActivetStudentForTutor, getAllStudentOfTutorAtivos } from '../controllers/User/index.js';

const userRoutes = Router();

userRoutes.get('/users', getAll);
userRoutes.get('/users/:idTutor', getAllStudentOfTutor);
userRoutes.get('/students/:idTutor', getAllStudentOfTutorAtivos)
userRoutes.get('/user/:username', getOneUsername);
userRoutes.get('/student/:username', getStudentsByUsername);
userRoutes.get('/tutores/:idAluno', getTutoresForStudents);

userRoutes.post('/user', create)

userRoutes.patch('/user/:username', patchEstudentExist);
userRoutes.patch('/student', patchActivetStudentForTutor);

export default userRoutes;

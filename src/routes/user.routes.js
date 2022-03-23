import { Router } from 'express';
import { create, getAll, getOneUsername } from '../controllers/User/index.js';

const userRoutes = Router();

userRoutes.get('/users', getAll);
userRoutes.get('/user/:username', getOneUsername);
userRoutes.post('/user', create);

export default userRoutes;

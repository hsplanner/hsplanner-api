import { Router } from 'express';
import {login} from '../controllers/Auth/index.js';

const authRoutes = Router();

authRoutes.post('/login', login)

export default authRoutes;

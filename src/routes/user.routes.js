import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/users', (req, res) => {
    return res.send('user');
});

export default userRoutes;

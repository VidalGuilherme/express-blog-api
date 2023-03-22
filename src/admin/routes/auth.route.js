import express from 'express';
import authController from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.post('/', (req,res) => authController.login(req, res));

export default router;
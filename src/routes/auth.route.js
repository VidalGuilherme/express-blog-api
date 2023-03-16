import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/', (req,res) => authController.login(req, res));

export default router;
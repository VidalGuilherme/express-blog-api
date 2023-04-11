import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/', (req,res) => authController.login(req, res));
router.get('/google', (req,res) => authController.google(req, res));


export default router;
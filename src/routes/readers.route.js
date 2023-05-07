import express from 'express';
import readersController from '../controllers/readers.controller.js';
import {validAuth} from '../middlewares/auth.middlewares.js';

const router = express.Router();
router.patch('/message', (req, res) => readersController.message(req, res));

export default router;
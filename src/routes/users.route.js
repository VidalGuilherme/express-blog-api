import express from 'express';
import userController from '../controllers/users.controllers.js';
import {validId, validUser} from '../middlewares/global.middlewares.js';

const router = express.Router();

router.get('/', (req,res) => userController.list(req, res));
router.get('/:id', validId, validUser, (req,res) => userController.find(req, res));
router.post('/', (req, res) => userController.create(req, res));
router.patch('/:id', validId, validUser, (req, res) => userController.update(req, res));
router.delete('/:id', validId, validUser, (req, res) => userController.remove(req, res));

export default router;
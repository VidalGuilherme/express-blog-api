import express from 'express';
import userController from '../controllers/users.controller.js';
import {validId, validUser} from '../middlewares/global.middlewares.js';
import {validAuth} from '../middlewares/auth.middlewares.js';

const router = express.Router();

// router.get('/', validAuth, (req,res) => userController.list(req, res));
// router.get('/:id', validAuth, validId, validUser, (req,res) => userController.find(req, res));
// router.post('/', validAuth, (req, res) => userController.create(req, res));
// router.patch('/:id', validAuth, validId, validUser, (req, res) => userController.update(req, res));
// router.delete('/:id', validAuth,  validId, validUser, (req, res) => userController.remove(req, res));

export default router;
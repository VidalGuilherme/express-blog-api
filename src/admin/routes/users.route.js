import express from 'express';
import userController from '../controllers/users.controller.js';
import {validId, validUser} from '../../middlewares/global.middlewares.js';
import {validAuthAdmin} from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/', validAuthAdmin, (req,res) => userController.list(req, res));
router.get('/:id', validAuthAdmin, validId, validUser, (req,res) => userController.find(req, res));
router.post('/', validAuthAdmin, (req, res) => userController.create(req, res));
router.patch('/:id', validAuthAdmin, validAuth, validId, validUser, (req, res) => userController.update(req, res));
router.delete('/:id',validAuthAdmin, validAuth,  validId, validUser, (req, res) => userController.remove(req, res));

export default router;
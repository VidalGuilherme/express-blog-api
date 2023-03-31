import express from 'express';
import readersController from '../controllers/readers.controller.js';
import {validId, validReaders} from '../../middlewares/global.middlewares.js';
import {validAuthAdmin} from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/', validAuthAdmin, (req,res) => readersController.list(req, res));
router.get('/:id', validAuthAdmin, validId, validReaders, (req,res) => readersController.find(req, res));
router.post('/', validAuthAdmin, (req, res) => readersController.create(req, res));
router.patch('/:id', validAuthAdmin, validId, validReaders, (req, res) => readersController.update(req, res));
router.delete('/:id', validAuthAdmin, validId, validReaders, (req, res) => readersController.remove(req, res));

export default router;
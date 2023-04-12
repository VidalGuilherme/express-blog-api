import express from 'express';
import imagesController from '../controllers/images.controller.js';
import {validAuthAdmin} from '../middlewares/auth.middlewares.js';
import { multer } from '../../middlewares/multer.middlewares.js';
import { sharpImage } from '../../middlewares/sharp.middlewares.js';

const router = express.Router();

router.get('/', validAuthAdmin, (req,res) => imagesController.list(req, res));
router.post('/', validAuthAdmin, multer.single('file'), sharpImage, (req, res) => imagesController.create(req, res));
router.delete('/:id', validAuthAdmin, (req, res) => imagesController.remove(req, res));
router.post('/folder', validAuthAdmin, (req, res) => imagesController.createDir(req, res));

export default router;
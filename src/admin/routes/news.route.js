import express from 'express';
import newsController from '../controllers/news.controller.js';
import {validId, validNews} from '../../middlewares/global.middlewares.js';
import {validAuthAdmin} from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/', validAuthAdmin, (req,res) => newsController.list(req, res));
router.get('/:id', validAuthAdmin, validId, validNews, (req,res) => newsController.find(req, res));
router.post('/', validAuthAdmin, (req, res) => newsController.create(req, res));
router.patch('/:id', validAuthAdmin, validId, validNews, (req, res) => newsController.update(req, res));
router.put('/:id', validAuthAdmin, validId, validNews, (req, res) => newsController.update(req, res));
router.delete('/:id', validAuthAdmin, validId, validNews, (req, res) => newsController.remove(req, res));

export default router;
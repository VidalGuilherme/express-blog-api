import express from 'express';
import newsController from '../controllers/news.controller.js';
import {validId} from '../middlewares/global.middlewares.js';

const router = express.Router();

router.get('/', (req,res) => newsController.list(req, res));
router.get('/:id', validId, (req,res) => newsController.find(req, res));
router.post('/', (req, res) => newsController.create(req, res));
router.patch('/:id', validId, (req, res) => newsController.update(req, res));
router.delete('/:id', validId, (req, res) => newsController.remove(req, res));

export default router;
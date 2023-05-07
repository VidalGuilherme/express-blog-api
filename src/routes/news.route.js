import express from 'express';
import newsController from '../controllers/news.controller.js';
import {validId, validNews} from '../middlewares/global.middlewares.js';
import {validAuth} from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/', (req,res) => newsController.list(req, res));
//router.get('/:id', validAuth, validId, validNews, (req,res) => newsController.find(req, res));
router.get('/:category/:slug', (req,res) => newsController.findBySlug(req, res));
//router.patch('/like/:id', validAuth, validId, validNews, (req, res) => newsController.likeAndDeslike(req, res));
router.patch('/comment/:id', validId, validNews, (req, res) => newsController.comment(req, res));
router.patch('/uncomment/:id/:idComment', validId, validNews, (req, res) => newsController.uncomment(req, res));

export default router;
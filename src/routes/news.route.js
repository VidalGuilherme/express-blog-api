import express from 'express';
import newsController from '../controllers/news.controller.js';
import {validId, validNews} from '../middlewares/global.middlewares.js';
import {validAuth} from '../middlewares/auth.middlewares.js';

const router = express.Router();

router.get('/', validAuth, (req,res) => newsController.list(req, res));
router.get('/:id', validAuth, validId, validNews, (req,res) => newsController.find(req, res));
router.get('/:category/:slug', validAuth, (req,res) => newsController.findBySlug(req, res));
router.patch('/like/:id', validAuth, validId, validNews, (req, res) => newsController.likeAndDeslike(req, res));
router.patch('/comment/:id', validAuth, validId, validNews, (req, res) => newsController.comment(req, res));
router.patch('/uncomment/:id/:idComment', validAuth, validId, validNews, (req, res) => newsController.uncomment(req, res));

// router.post('/', validAuth, (req, res) => newsController.create(req, res));
// router.patch('/:id', validAuth, validId, validNews, (req, res) => newsController.update(req, res));
// router.delete('/:id', validAuth, validId, validNews, (req, res) => newsController.remove(req, res));




export default router;
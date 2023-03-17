import express from 'express';
import userController from '../controllers/users.controller.js';
import {validId, validUser} from '../middlewares/global.middlewares.js';
import {validAuth} from '../middlewares/auth.middlewares.js';

const router = express.Router();

// Routes
/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get all Users,
 *      description: Use to requesta all users
 *      tags: ["Users"]
 *      responses:
 *          '200':
 *              description: Asucessful response 
 */
router.get('/', validAuth, (req,res) => userController.list(req, res));
/**
 * @swagger
 * /users:
 *  put:
 *      summary: Find a User,
 *      description: Use to update a user
 *      tags: ["Users"]
 *      responses:
 *          '201':
 *              description: Asucessful response 
 */
router.get('/:id', validAuth, validId, validUser, (req,res) => userController.find(req, res));
router.post('/', (req, res) => userController.create(req, res));
router.patch('/:id', validAuth, validId, validUser, (req, res) => userController.update(req, res));
router.delete('/:id', validAuth,  validId, validUser, (req, res) => userController.remove(req, res));

export default router;
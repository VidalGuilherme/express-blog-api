const router = require('express').Router();
const userController = require('../controllers/users.controllers');
const {validId, validUser} = require('../middlewares/global.middlewares');

router.get('/', (req,res) => userController.list(req, res));
router.get('/:id', validId, validUser, (req,res) => userController.find(req, res));
router.post('/', (req, res) => userController.create(req, res));
router.patch('/:id', validId, validUser, (req, res) => userController.update(req, res));
router.delete('/:id', validId, validUser, (req, res) => userController.remove(req, res));


module.exports = router;
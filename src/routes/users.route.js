const router = require('express').Router();
const userController = require('../controllers/users.controllers');

router.get('/', async function(req,res,next){
    try{
        userController.list(req, res);
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro: `${ex}`});
    }
});

router.post('/', async function(req, res, next){
    try{
        userController.create(req, res);
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro: `${ex}`});
    }
});

router.put('/', async function(req, res, next){
    try{
        //userController.create(req, res);
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro: `${ex}`});
    }
});

router.delete('/', async function(req, res, next){
    try{
        //userController.create(req, res);
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro: `${ex}`});
    }
});

module.exports = router;
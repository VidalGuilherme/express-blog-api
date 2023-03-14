const router = require('express').Router();
const userController = require('../controllers/users.controllers');

router.get('/', async function(req,res,next){
    try{
        userController.soma(req, res);
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro: `${ex}`});
    }
});


module.exports = router;
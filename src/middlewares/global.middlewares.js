import mongoose from 'mongoose';
import userService from '../services/users.service.js';

const validId = (req, resp, next) => {
    try{
        const id = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return resp.status(400).send({message: "Id inválido."});
        }
        req.id = id;
        next();
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const validUser = async (req, resp, next) => {
    try{
        const id = req.params.id;
        const user = await userService.find(id);
        if(!user){
            return resp.status(400).send({message: "Usuário não encontrado."});
        }
        req.id = id;
        req.user = user;
        next();
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export {validId, validUser};
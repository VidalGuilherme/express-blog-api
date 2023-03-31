import mongoose from 'mongoose';
import userService from '../services/users.service.js';
import newsService from '../services/news.service.js';
import readersService from '../services/readers.service.js';

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

const validNews = async (req, resp, next) => {
    try{
        const id = req.params.id;
        const news = await newsService.find(id);
        if(!news){
            return resp.status(400).send({message: "News não encontrado."});
        }
        req.id = id;
        req.news = news;
        next();
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const validReaders = async (req, resp, next) => {
    try{
        const id = req.params.id;
        const reader = await readersService.find(id);
        if(!reader){
            return resp.status(400).send({message: "Reader não encontrado."});
        }
        req.id = id;
        req.reader = reader;
        next();
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const stringToSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
  
    return str;
};

export {validId, validUser, validNews, validReaders, stringToSlug};
import newsService from '../services/news.service.js';

const list = async (req, resp) => {
    try{
        const news = await newsService.list();
        return resp.json(news);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const find = async (req, resp) => {
    try{
        const news = req.news;
        return resp.json(news);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const create = async (req, resp) => {
    try{
        const {title, text, banner} = req.body;

        if(!title || !text || !banner){
            return resp.status(400).send({message: "Preencha todos os campos para o registro."});
        }

        const news = await newsService.create({
            title, text, banner, user:{_id:"213123123"}
        });

        if(!news){
            return resp.status(400).send({message: "Erro ao tentar criar notícia."});
        }

        return resp.status(201).send({
            news: {id: news._id, title},
            message: "Notícia criada com sucesso!"
        });
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const update = async (req, resp) => {
    try{
        const {title, text, banner} = req.body;

        if(!title && !text && !banner){
            return resp.status(400).send({message: "Preencha pelo menos um campo para o atualizar."});
        }

        const {id, news} = req;
        await newsService.update(id, title, text, banner);

        return resp.status(200).send({message: "Notícia atualizada com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const remove = async (req, resp) => {
    try{
        const id = req.id;
        await newsService.remove(id);
        return resp.status(200).send({message: "Notícia removida com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export default {list, find, create, update, remove};
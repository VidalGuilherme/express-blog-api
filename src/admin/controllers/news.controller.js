import newsService, {commentNews} from '../../services/news.service.js';

const list = async (req, resp) => {
    try{
        let {_end, _start, _order, _sort} = req.query;
        const {title, userId} = req.query;
        const filterTitle = title ? { title: { $regex: `${title}`, $options: "i" } } : {};
        const filterUser = userId ? { user: userId} : {};
        const filters = Object.assign(filterTitle, filterUser);

        const news = await newsService.list(_start, _end, filters); 
        const data = news.data.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            user: {
                id: item.user._id,
                name: item.user.name,
            },
            createdAt: item.createdAt,
            counLikes: item.likes.length,
            countComments: item.comments.length,
        }));

        resp.set('Access-Control-Expose-Headers', 'X-Total-Count');
        resp.set('X-Total-Count', news.total);
        return resp.json(data);
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

        const news = await newsService.create(title, text, banner, req.userId);

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

const likeAndDeslike = async (req, resp) => {
    try{
        const id = req.id,
            news = req.news,
            userId = req.userId;

        const liked = await newsService.like(id, userId);

        if(!liked){
            await newsService.deslike(id, userId);
            return resp.status(200).send({message: "desliked!"});
        }

        return resp.status(200).send({message: "liked!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const comment = async (req, resp) => {
    try{
        const id = req.id,
            news = req.news,
            userId = req.userId,
            {comment} = req.body;

        await commentNews(id, userId, comment);
        
        return resp.status(200).send({message: "Comentado com Sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const uncomment = async (req, resp) => {
    try{
        const id = req.id,
            commentId = req.params.idComment,
            userId = req.userId;

        const news = await newsService.uncomment(id, userId, commentId);
        const uncomment = news.comments.find((comment) => comment._id === commentId );

        if(!uncomment){
            return resp.status(404).send({message: "Comentário não encontrado"});
        }

        if(uncomment.userId !== userId){
            return resp.status(401).send({message: "Não autorizado"});
        }

        return resp.status(200).send({message: "Comentário removido com Sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export default {list, find, create, update, remove, likeAndDeslike, comment, uncomment};
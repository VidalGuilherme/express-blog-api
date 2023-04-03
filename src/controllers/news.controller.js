import newsService, {commentNews, formatNews} from '../services/news.service.js';

const list = async (req, resp) => {
    try{
        let {page, limit, sort, off} = req.query;
        const {title, userId} = req.query;
        const filterTitle = title ? { title: { $regex: `${title}`, $options: "i" } } : {};
        const filterUser = userId ? { user: userId} : {};
        const filters = Object.assign(filterTitle, filterUser);

        page = page ? Number(page) : 1;
        limit = limit ? Number(limit) : 5;
        const offset = off || (page-1) * limit;

        const news = await newsService.list(offset, limit, sort || -1, filters);
        const pagesTotal = news.total/limit;
        const next = page < pagesTotal ? page + 1 : null;
        const previous = page > 1 ? page - 1 : null;
        
        const list = {
            pagination: {
                total: news.total,
                currentPage: page,            
                next,
                previous,
            },
            news: news.data.map((item) => formatNews(item))
        };

        return resp.json(list);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const findBySlug = async (req, resp) => {
    try{
        const {category, slug} = req.params;
        const news = formatNews(await newsService.findBySlug(category, slug));
        return resp.json({news});
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
            userId = req.userId,
            {comment, name, email} = req.body;

        if(!name || !email || !comment){
            return resp.status(400).send({message: "Preencha todos os campos para o comentar."});
        }

        await commentNews(id, userId, comment, name, email);
        
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

        const uncomment = await newsService.uncomment(id, userId, commentId);        

        if(!uncomment){
            return resp.status(404).send({message: "Comentário não encontrado"});
        }

        // if(uncomment.userId !== userId){
        //     return resp.status(401).send({message: "Não autorizado"});
        // }

        return resp.status(200).send({message: "Comentário removido com Sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export default {list, findBySlug, likeAndDeslike, comment, uncomment};
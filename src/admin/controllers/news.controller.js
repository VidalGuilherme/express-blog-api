import newsService, {commentNews} from '../../services/news.service.js';

const list = async (req, resp) => {
    try{
        let {_end, _start, _order, _sort} = req.query;
        const {title, userId} = req.query;
        const filterTitle = title ? { title: { $regex: `${title}`, $options: "i" } } : {};
        const filterUser = userId ? { user: userId} : {};
        const filters = Object.assign(filterTitle, filterUser);

        const order = _order == 'ASC' ? -1 : 1;
        const news = await newsService.list(parseInt(_start) || 0, parseInt(_end) || 15, order, filters);

        const data = news.data.map((item) => formatNews(item));

        resp.set('Access-Control-Expose-Headers', 'X-Total-Count');
        resp.set('X-Total-Count', news.total);
        return resp.json(data);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const find = async (req, resp) => {
    try{
        const news = formatNews(req.news);
        return resp.json(news);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const create = async (req, resp) => {
    try{
        const {title, text, banner, category} = req.body;

        if(!title || !text || !banner || !category){
            return resp.status(400).send({message: "Preencha todos os campos para o registro."});
        }

        const news = await newsService.create(title, text, banner, category, req.userId);

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
        const {title, text, banner, category} = req.body;

        if(!title && !text && !banner && !category){
            return resp.status(400).send({message: "Preencha pelo menos um campo para o atualizar."});
        }

        const {id, news} = req;
        await newsService.update(id, title, text, banner, category);

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

const formatNews = (item) => {
    return {
        id: item._id,
        slug: item.slug,
        category: item.category,
        title: item.title,
        text: item.text,
        banner: item.banner,
        createdAt: item.createdAt,
        comments: item.comments.reverse().map((com) => ({
            id: com._id,
            name: com.name,
            email: com.email,
            comment: com.comment,
            createdAt: com.createdAt
        })),
        userId: item.user._id,
    };
}

export default {list, find, create, update, remove};
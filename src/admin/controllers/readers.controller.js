import readersService from '../../services/readers.service.js';

const list = async (req, resp) => {
    try{
        let {page, limit} = req.query;
        const {name, email} = req.query;
        const filterName = name ? { name: { $regex: `${name}`, $options: "i" } } : {};
        const filterEmail = email ? { email: { $regex: `${email}`, $options: "i" } } : {};
        const filters = Object.assign(filterName, filterEmail);

        page = page ? Number(page) : 1;
        limit = limit ? Number(limit) : 5;
        const offset = (page-1) * limit;

        const readers = await readersService.list(offset, limit, filters);
        const pagesTotal = readers.total/limit;
        const next = page < pagesTotal ? page + 1 : null;
        const previous = page > 1 ? page - 1 : null;

        const list = {
            pagination: {
                total: readers.total,
                currentPage: page,            
                next,
                previous,
            },
            readers: readers.data.map((item) => ({
                id: item._id,
                name: item.name,
                email: item.email,                
                comments: item.comments,
                messages: item.messages,
            }))
        };

        return resp.json(list);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const find = async (req, resp) => {
    try{
        const reader = req.reader;
        return resp.json(reader);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const create = async (req, resp) => {
    try{
        const {name, email} = req.body;

        if(!name || !email){
            return resp.status(400).send({message: "Preencha todos os campos para o registro."});
        }

        const readers = await readersService.create(name, email);

        if(!readers){
            return resp.status(400).send({message: "Erro ao tentar criar reader."});
        }

        return resp.status(201).send({
            readers: {id: readers._id, name},
            message: "Reader criado com sucesso!"
        });
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const update = async (req, resp) => {
    try{
        const {name, email} = req.body;

        if(!name && !email){
            return resp.status(400).send({message: "Preencha pelo menos um campo para o atualizar."});
        }

        const {id, reader} = req;
        await readersService.update(id, name, email);

        return resp.status(200).send({message: "Reader atualizado com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const remove = async (req, resp) => {
    try{
        const id = req.id;
        await readersService.remove(id);
        return resp.status(200).send({message: "Reader removido com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export default {list, find, create, update, remove};
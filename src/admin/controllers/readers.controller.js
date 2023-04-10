import readerService from '../../services/readers.service.js';

const list = async (req, resp) => {
    try{
        const readers = await readerService.list();

        resp.set('Access-Control-Expose-Headers', 'X-Total-Count');
        resp.set('X-Total-Count', readers.length);
  
        const data = readers.map((item) => formatReader(item));

        return resp.json(data);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const find = async (req, resp) => {
    try{
        const reader = formatReader(req.reader);
        return resp.json(reader);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const create = async (req, resp) => {
    try{
        const {name, email} = req.body;

        if(!name || !email ){
            return resp.status(400).send({message: "Preencha todos os campos para o registro."});
        }

        const reader = await readerService.create(name,  email);
        if(!reader){
            return resp.status(400).send({message: "Erro ao tentar criar leitor."});
        }

        return resp.status(201).send({
            reader: {id: reader._id, name, email},
            message: "Leitor criado com sucesso!"
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
        await readerService.update(id, name, email);

        return resp.status(200).send({message: "Leitor atualizado com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const remove = async (req, resp) => {
    try{
        const id = req.id;
        await readerService.remove(id);
        return resp.status(200).send({message: "Leitor removido com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const formatReader = (item) => {
    return {
        id: item._id,
        name: item.name,
        email: item.email,
        messages: item.messages,
        comments: item.comments,
    };
}

export default {list, find, create, update, remove};
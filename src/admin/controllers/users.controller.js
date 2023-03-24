import userService from '../../services/users.service.js';

const list = async (req, resp) => {
    try{
        const users = await userService.list();

        resp.set('Access-Control-Expose-Headers', 'X-Total-Count');
        resp.set('X-Total-Count', users.length);
  
        const data = users.map((item) => ({
            id: item._id,
            name: item.name,
            username: item.username,
            email: item.email,
            avatar: item.avatar,
        }));

        return resp.json(data);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const find = async (req, resp) => {
    try{
        const user = req.user;
        return resp.json(user);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const create = async (req, resp) => {
    try{
        const {name, username, password, email, avatar, background} = req.body;

        if(!name || !username || !password || !email || !avatar || !background){
            return resp.status(400).send({message: "Preencha todos os campos para o registro."});
        }

        const user = await userService.create(name, username, password, email, avatar, background);
        if(!user){
            return resp.status(400).send({message: "Erro ao tentar criar usuário."});
        }

        return resp.status(201).send({
            user: {id: user._id, name, username},
            message: "Usuário criado com sucesso!"
        });
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const update = async (req, resp) => {
    try{
        const {name, username, password, email, avatar, background} = req.body;

        if(!name && !username && !password && !email && !avatar && !background){
            return resp.status(400).send({message: "Preencha pelo menos um campo para o atualizar."});
        }

        const {id, user} = req;
        await userService.update(id, name, username, password, email, avatar, background);

        return resp.status(200).send({message: "Usuário atualizado com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const remove = async (req, resp) => {
    try{
        const id = req.id;
        await userService.remove(id);
        return resp.status(200).send({message: "Usuário removido com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export default {list, find, create, update, remove};
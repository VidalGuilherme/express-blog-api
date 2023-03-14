const list = (req, resp) => {
    resp.json([]);
};

const create = (req, resp) => {
    const {name, username, password, email, avatar, background} = req.body;

    if(!name || !username || !password || !email || !avatar || !background){
        resp.status(400).send({message: "Preencha todos os campos para o registro."});
    }

    resp.status(201).send({
        user: {name, username},
        message: "Usuário criado com sucesso!"
    });
};


module.exports = {list, create};
import {messageReader} from '../services/readers.service.js';

const message = async (req, resp) => {
    try{
        const {message, name, email} = req.body;

        if(!name || !email || !message){
            return resp.status(400).send({message: "Preencha todos os campos para enviar menssagem."});
        }

        await messageReader(email, name, message);
        
        return resp.status(200).send({message: "Menssagem enviada com Sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export default {message};
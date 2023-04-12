import bcrypt from 'bcrypt';
import {findUserByEmailWithPass} from '../services/users.service.js';
import {generateToken} from '../services/auth.service.js';

const login = async (req, resp) => {
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return resp.status(400).json({message: "Preencha os campos email e senha!"});
        }

        const user = await findUserByEmailWithPass(email);
        const passwordIsValid = user ? await bcrypt.compare(password, user.password) : false; 

        if(!passwordIsValid || !user){
            return resp.status(400).json({message: "Email ou Senha Inválidos!"});
        }

        const token = generateToken(user.id);
        return resp.json({token:token});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const google = async (req, resp) => {
    try{
        return resp.json({});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export default {login, google};
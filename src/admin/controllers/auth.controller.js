import bcrypt from 'bcrypt';
import {findUserByEmailWithPass} from '../../services/users.service.js';
import {generateTokenAdmin} from '../../services/auth.service.js';

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

        const token = generateTokenAdmin(user.id);
        return resp.json({token:token});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export default {login};
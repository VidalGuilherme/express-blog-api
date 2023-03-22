import jwt from "jsonwebtoken";
import usersService from "../../services/users.service.js";

const validAuthAdmin = (req, resp, next) => {
    try{
        const {authorization} = req.headers;
        
        if(!authorization){
            return resp.send(401);
        }

        const authParts = authorization.split(" ");

        if(authParts.length !== 2){
            return resp.send(401);
        }

        const [schema, token] = authParts;

        if(schema !== 'Bearer'){
            return resp.send(401);
        }

        jwt.verify(token, process.env.JWT_ADMIN_SECRET, async (error, decoded) => {
            if(error){
                return resp.status(401).json('Expire');
            }

            const user = await usersService.find(decoded.id);
            if(!user || !user.id){
                return resp.send(401);
            }

            req.userId = user.id;
            next();
        });                
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export {validAuthAdmin};
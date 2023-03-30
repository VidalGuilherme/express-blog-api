import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config(); 

const generateToken = (id) => jwt.sign({id:id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES});
const generateTokenAdmin = (id) => jwt.sign({id:id}, process.env.JWT_ADMIN_SECRET, {expiresIn:process.env.JWT_ADMIN_EXPIRES});

export {generateToken, generateTokenAdmin};
import jwt from "jsonwebtoken";

const generateToken = (id) => jwt.sign({id:id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRES});

export {generateToken};
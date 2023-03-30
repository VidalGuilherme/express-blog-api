import userRepositorie, { findByEmailWithPass } from '../repositories/users.repositorie.js';

const list = async () => {
    const users = await userRepositorie.list();
    return users;
};

const find = async (id) => {
    const user = await userRepositorie.find(id);
    return user;
};

const create = async (name, username, password, email, avatar, background) => {
    const user = await userRepositorie.create({name, username, password, email, avatar, background});
    return user;
};

const update = async (id, name, username, password, email, avatar, background) => {
    await userRepositorie.update(id, name, username, password, email, avatar, background);
    return true;
};

const remove = async (id) => {
    await userRepositorie.remove(id);
    return true;
};

const findUserByEmailWithPass = async (email) => {
    const user = findByEmailWithPass(email);
    return user;
};

export default {list, find, create, update, remove};

export {findUserByEmailWithPass};
import User from '../models/User.js';

const create = (body) => User.create(body);

const list = () => User.find();

const find = (id) => User.findById(id);

const findByEmailWithPass = (email) => User.findOne({email:email}).select('+password');

const update = (id, name, username, password, email, avatar, background) => User.findOneAndUpdate({_id:id}, {name, username, password, email, avatar, background});

const remove = (id) => User.findOneAndRemove({_id:id});

export default {
    create, list, find, update, remove
};

export {findByEmailWithPass};
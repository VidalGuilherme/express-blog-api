const User = require('../models/User');

const create = (body) => User.create(body);

const list = () => User.find();

const find = (id) => User.findById(id);

const update = (id, name, username, password, email, avatar, background) => User.findOneAndUpdate({_id:id}, {name, username, password, email, avatar, background});

const remove = (id) => User.findOneAndRemove({_id:id});

module.exports = {
    create, list, find, update, remove
};
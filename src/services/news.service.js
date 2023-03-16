import New from '../models/New.js';

const create = (body) => New.create(body);

const list = () => New.find();

const find = (id) => New.findById(id);

const update = (id, title, banner) => New.findOneAndUpdate({_id:id}, {id, title, banner});

const remove = (id) => New.findOneAndRemove({_id:id});

export default {
    create, list, find, update, remove
};
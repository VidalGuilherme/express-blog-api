import Reader from '../models/Reader.js';

const create = (body) => Reader.create(body);

const list = () => Reader.find();

const find = (id) => Reader.findById(id);

const findByEmail = (email) => Reader.findOne({email: email});

const update = (id, name, email) => Reader.findOneAndUpdate({_id:id}, {name, email});

const remove = (id) => Reader.findOneAndRemove({_id:id});

const total = (filters) => Reader.countDocuments(filters);

const readerComment = async (id, comment) => { 
    const commentId = Math.floor(Date.now() * Math.random()).toString(36);
    await Reader.findOneAndUpdate(
        { _id: id },
        { $push: { comments: {_id: commentId, comment: comment, createdAt: new Date()} } }
    );
    return commentId;
};

const readerMessage = async (id, message) => { 
    const messageId = Math.floor(Date.now() * Math.random()).toString(36);
    return await Reader.findOneAndUpdate(
        { _id: id },
        { $push: { messages: {_id: messageId, message: message, createdAt: new Date()} } }
    );
};

export default {
    create, list, find, findByEmail, update, remove, total
};

export {readerComment, readerMessage}
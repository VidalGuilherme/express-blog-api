import Reader from '../models/Reader.js';

const create = (body) => New.create(body);

const list = (offset, limit, filters) => New.find(filters).sort({_id:-1}).skip(offset).limit(limit);

const find = (id) => New.findById(id);

const findByEmail = (email) => New.findOne({email: email});

const update = (id, name, email) => New.findOneAndUpdate({_id:id}, {id, name, email});

const remove = (id) => New.findOneAndRemove({_id:id});

const total = (filters) => New.countDocuments(filters);

const readerComment = (id, comment) => { 
    const commentId = Math.floor(Date.now() * Math.random()).toString(36);
    Reader.findOneAndUpdate(
        { _id: id },
        { $push: { comments: {_id: commentId, comment: comment, createdAt: new Date()} } }
    );
    return commentId;
};

const readerMessage = (id, message) => { 
    const messageId = Math.floor(Date.now() * Math.random()).toString(36);
    return New.findOneAndUpdate(
        { _id: id },
        { $push: { messages: {_id: messageId, message: message, createdAt: new Date()} } }
    );
};

export default {
    create, list, find, findByEmail, update, remove, total
};

export {readerComment, readerMessage}
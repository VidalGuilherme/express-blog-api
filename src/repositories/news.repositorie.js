import New from '../models/New.js';

const create = (body) => New.create(body);

const list = (offset, limit, sort, filters) => New.find(filters).sort({_id:sort||-1}).skip(offset).limit(limit).populate('user');

const find = (id) => New.findById(id).populate('user');

const findBySlug = (category, slug) => New.findOne({slug: slug, category: category}).populate('user');

const update = (id, body) => New.findOneAndUpdate({_id:id}, body);

const remove = (id) => New.findOneAndRemove({_id:id});

const total = (filters) => New.countDocuments(filters);

const last = () => New.findOne().sort({_id:-1}).populate('user');

const like = (id, userId) => New.findOneAndUpdate(
    { _id: id, 'likes.userId': { $nin: [userId] } },
    { $push: { likes: {userId, createdAt: new Date()} } }
);

const deslike = (id, userId) => New.findOneAndUpdate(
    { _id: id},
    { $pull: { likes: {userId} } }
);

const newsComment = (id, userId, readerId, commentId, comment, name, email) => {     
    return New.findOneAndUpdate(
        { _id: id },
        { $push: { comments: {_id: commentId, userId, readerId, name, email, comment, createdAt: new Date()} } }
    );
};

const uncomment = (id, userId, commentId) => New.findOneAndUpdate(
    { _id: id },
    { $pull: { comments: {_id: commentId} } }
);

export default {
    create, list, find, findBySlug, update, remove, total, last, like, deslike, uncomment
};

export {newsComment}
import { Model } from 'mongoose';
import New from '../models/New.js';

const create = (body) => New.create(body);

const list = (offset, limit, sort, filters) => New.find(filters).sort(sort).skip(offset).limit(limit).populate('user');

const listAgg = (offset, limit, sort, filters) => {
    //const match = filters ? {$match: filters} : {};
    const aggregate = New.aggregate([
        {$project: { 
            _id: 1,
            title: 1,
            draft: 1,
            slug: 1,
            category: 1,
            text: 1,
            banner: 1,
            createdAt: 1,
            tags: 1,
            comments: 1,
            user: -1,
        }},
        { $match: filters},
        { $sort: sort},
        { $skip: offset },
        { $limit: limit},
        // { $lookup: {
        //     from: 'users',
        //     localField: '_id',
        //     foreignField: 'user',
        //     as: 'user'
        // }},
    ]);

    return aggregate.exec();
};

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

export {newsComment, listAgg}
import newsRepositorie, {newsComment, listAgg} from '../repositories/news.repositorie.js';
import { stringToSlug } from '../middlewares/global.middlewares.js';
import { commentReader } from './readers.service.js';

const list = async (offset, limit, sort, filters) => {
    //const news = await newsRepositorie.list(offset, limit, sort, filters);
    const news = await listAgg(offset, limit, sort, filters);
    const total = await newsRepositorie.total(filters);
    return {
        total: total,
        data: news
    };
};

const find = async (id) => {
    const news = await newsRepositorie.find(id);
    return news;
};

const findBySlug = async (category, slug) => {    
    const news = await newsRepositorie.findBySlug(category, slug);
    return news;
};

const create = async (title, text, banner, category, tags, draft, userId) => {
    const slug = stringToSlug(title);
    category = category.toLowerCase();
    const news = await newsRepositorie.create({
        title, slug, text, banner, category, tags, draft, user:{_id:userId}
    });
    return news;
};

const update = async (id, title, text, banner, category, tags, createdAt, draft) => {
    const slug = title ? stringToSlug(title) : undefined;
    category = category.toLowerCase();
    await newsRepositorie.update(id, {title, slug, text, banner, category, tags, createdAt, draft});
    return true;
};

const remove = async (id) => {
    await newsRepositorie.remove(id);
    return true;
};

const like = async (id, userId) => {
    const liked = await newsRepositorie.like(id, userId);
    return liked;
};

const deslike = async (id, userId) => {
    await newsRepositorie.deslike(id, userId);
};

const commentNews = async (id, userId, comment, name, email) => {
    const { readerId, commentId } = await commentReader(email, name, comment);
    const newComment = await newsComment(id, userId, readerId, commentId, comment, name, email);
    return true;
};

const uncomment = async (id, userId, commentId) => {
    const news = await newsRepositorie.uncomment(id, userId, commentId);
    const uncomment = news.comments.find((comment) => comment._id === commentId );
    return uncomment;
};

const total = async (filters) => {
    return newsRepositorie.total(filters);
};

const last = async () => {
    return newsRepositorie.last();
};

const formatNews = (item) => {
    return {
        id: item._id,
        slug: item.slug,
        category: item.category,
        title: item.title,
        draft: item.draft,
        text: item.text,
        banner: item.banner,
        createdAt: item.createdAt,
        tags: item.tags,
        comments: item.comments.reverse().map((com) => ({
            id: com._id,
            name: com.name,
            comment: com.comment,
            createdAt: com.createdAt
        })),
        user: item.user ? {
            name: item.user.name,
            usermame: item.user.username,
        } : {}
    };
}

export default {
    list, find, findBySlug, create, update, remove, total, last, like, deslike, uncomment
};

export {commentNews, formatNews}
import newsRepositorie, {newsComment} from '../repositories/news.repositorie.js';

const list = async (page, limit, filters) => {
    const news = await newsRepositorie.list(page, limit, filters);
    const total = await newsRepositorie.total();
    const pagesTotal = total/limit;
    const next = page < pagesTotal ? page + 1 : null;
    const previous = page > 1 ? page - 1 : 1;

    return {
        total,
        currentPage: page,            
        next,
        previous,
        news: news.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            createdAt: item.createdAt,
            likes: item.likes,
            comments: item.comments,
            user: {
                name: item.user.name,
                usermame: item.user.username,
                avatar: item.user.avatar,
            }
        }))
    };
};

const find = async (id) => {
    const news = await newsRepositorie.find(id);
    return resp.json(news);
};

const create = async (title, text, banner, userId) => {
    const news = await newsRepositorie.create({
        title, text, banner, user:{_id:userId}
    });
    return news;
};

const update = async (id, title, text, banner) => {
    await newsRepositorie.update(id, title, text, banner);
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

const commentNews = async (id, userId, comment) => {
    await newsComment(id, userId, comment);
    return true;
};

const uncomment = async (id, userId, commentId) => {
    const news = await newsRepositorie.uncomment(id, userId, commentId);
    const uncomment = news.comments.find((comment) => comment._id === commentId );
    return uncomment;
};

const total = async () => {
    return newsRepositorie.total();
};

const last = async () => {
    return newsRepositorie.last();
};

export default {
    list, find, create, update, remove, total, last, like, deslike, uncomment
};

export {commentNews}
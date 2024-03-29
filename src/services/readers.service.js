import readersRepositorie, {readerComment, readerMessage} from '../repositories/readers.repositorie.js';

const list = async () => {
    const readers = await readersRepositorie.list();
    return readers;
};

const find = async (id) => {
    const readers = await readersRepositorie.find(id);
    return readers;
};

const findByEmail = async (email) => {    
    const readers = await readersRepositorie.findByEmail(email);
    return readers;
};

const create = async (name, email) => {
    const readers = await readersRepositorie.create({name, email});
    return readers;
};

const update = async (id, name, email) => {
    await readersRepositorie.update(id, name, email);
    return true;
};

const remove = async (id) => {
    await readersRepositorie.remove(id);
    return true;
};

const commentReader = async (email, name, comment) => {
    let reader = await findByEmail(email);
    if(!reader)
        reader = await create(name, email);
    const commentId = await readerComment(reader.id, comment);
    return {readerId: reader.id, commentId: commentId};
};

const messageReader = async (email, name, message) => {
    let reader = await findByEmail(email);
    if(!reader)
        reader = await create(name, email);        
    await readerMessage(reader.id, message);
    return true;
};

const total = async (filters) => {
    return readersRepositorie.total(filters);
};

export default {
    list, find, findByEmail, create, update, remove, total
};

export {commentReader, messageReader}
import { listFiles, getFile, createFolder, updateFileName, updateFileFolder, uploadImage, removeFile } from '../../services/gdrive.service.js';

const list = async (req, resp) => {
    try{
        const {name, parent, type} = req.query;

        const files = await listFiles({name, parent}, type);

        const items = files.data.files.map((item) => formatImage(item));

        resp.set('Access-Control-Expose-Headers', 'X-Total-Count');
        resp.set('X-Total-Count', items.length);
        return resp.json(items);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const find = async (req, resp) => {
    try{
        const id = req.params.id;
        const file = await getFile(id);

        const item = formatImage(file.data);
        return resp.json(item);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const create = async (req, resp) => {
    try{
        const {folderName} = req.body;

        if (!req.file) {
            resp.status(400).send("No file uploaded.");
            return;
        }
        const response = await uploadImage(req.file, folderName);
        const item = formatImage(response.data);

        return resp.status(response.status).json(item);

    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const updateDir = async (req, resp) => {
    try{
        const {fileId, folderId} = req.body;

        if (!fileId || !folderId) {
            resp.status(400).send("No file and no Folder.");
            return;
        }

        const response = await updateFileFolder(fileId, folderId);

        return resp.status(response.status).json(response.textStatus);

    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const createDir = async (req, resp) => {
    try{

        const { dirName } = req.body;
        if (!dirName) {
            resp.status(400).send("No dir name.");
            return;
        }
        const response = await createFolder(dirName);
        const item = formatImage(response.data);

        return resp.status(response.status).json(item);

    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const remove = async (req, resp) => {
    try{
        const id = req.params.id;
        if (!id) {
            resp.status(400).send("No Id.");
            return;
        }
        await removeFile(id);
        return resp.status(200).send({message: "Arquivo removido com sucesso!"});
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

export const formatImage = (item) => {
    return {
        id: item.id,
        name: item.name,
        mimeType: item.mimeType,
        type: item.mimeType.split('/').slice(0, 1)[0],
        src: `https://drive.google.com/uc?id=${item.id}`,
    };
}

export default {list, find, create, createDir, updateDir, remove, formatImage};
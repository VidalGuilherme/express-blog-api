import { listFiles, createFolder, uploadImage, removeFile } from '../../services/gdrive.service.js';

const list = async (req, resp) => {
    try{
        const files = await listFiles();

        const items = files.data.files.map((item) => format(item));

        resp.set('Access-Control-Expose-Headers', 'X-Total-Count');
        resp.set('X-Total-Count', items.length);
        return resp.json(items);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const create = async (req, resp) => {
    try{
        if (!req.file) {
            resp.status(400).send("No file uploaded.");
            return;
        }
        const response = await uploadImage(req.file);
        const item = format(response.data);

        return resp.status(response.status).json(item);

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
        const item = format(response.data);

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

const format = (item) => {
    return {
        id: item.id,
        name: item.name,
        //src: `https://drive.google.com/file/d/${item.id}/view`,
        src: 'https://drive.google.com/file/d/1Lau_EOfVfgXBhM3u5vGxYCRlR5_KE2OW/view'
    };
}

export default {list, create, createDir, remove};
import { 
    listFiles, 
    getFile, 
    createFolder, 
    updateFileFolder, 
    uploadImage, 
    removeFile 
} from '../../services/gdrive.service.js';

const list = async (req, resp) => {
    try{
        const {name, parent, type} = req.query;

        const files = await listFiles({name, parent}, type);

        resp.set('Access-Control-Expose-Headers', 'X-Total-Count');
        resp.set('X-Total-Count', files.length);
        return resp.json(files);
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const find = async (req, resp) => {
    try{
        const id = req.params.id;
        const file = await getFile(id);
        
        return resp.json(file);
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
        const file = await uploadImage(req.file, folderName);

        return resp.status(201).json(file);

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
        const file = await createFolder(dirName);        

        return resp.status(response.status).json(file);

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



export default {list, find, create, createDir, updateDir, remove};
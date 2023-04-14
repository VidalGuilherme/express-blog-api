import sharp from "sharp";

const sharpImage = async (req, resp, next) => {
    try{
        if (!req.file) {
            resp.status(400).send("No file uploaded.");
            return;
        }

        //const path = `./local-files/${createFileName(req.file)}`;        
        const buffer = await sharp(req.file.buffer)
            .webp(
                //{lossless: true}
            )
            .resize(1024, 720)
            .toBuffer();
            //.toFile(path);

        req.file.originalname = createFileName(req.file);
        req.file.mimetype = 'image/webp';
        req.file.buffer = buffer;

        next();
    }catch(ex){
        return resp.status(500).json({erro: `${ex}`});
    }
};

const createFileName = (file) => {    
    //const type = file.originalname.split('.').slice(-1);
    return "tabgames_img_" + Date.now() + ".webp";
    //return file.fieldname + "_" + Date.now() + "" + type;
};

export {sharpImage};
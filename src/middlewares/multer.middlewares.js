import Multer from "multer";

const filter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] === 'image') {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed!"));
    }
};

const multer = Multer({
    storage: Multer.memoryStorage(),
    // storage: Multer.diskStorage({
    //     destination: function (req, file, callback) {
    //         callback(null, './local-files');
    //     },
    //     filename: function (req, file, callback) {
    //         callback(null, createFileName(file));
    //     },
    // }),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: filter,
});

export {multer};
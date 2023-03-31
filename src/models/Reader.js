import mongoose from 'mongoose';

const ReaderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    messages:{
        type: Array,
        required: true,
    },
    comments:{
        type: Array,
        required: true,
    },
});

const Reader = mongoose.model("Reader", ReaderSchema);

export default Reader;
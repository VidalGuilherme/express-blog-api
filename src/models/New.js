import mongoose from 'mongoose';

const NewSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    banner:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes:{
        type: Array,
        required: true,
    },
    comments:{
        type: Array,
        required: true,
    },
});

const New = mongoose.model("New", NewSchema);

export default New;
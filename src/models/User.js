import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    avatar:{
        type: String,
        required: true
    },
    background:{
        type: String,
        required: true
    }
});

UserSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

UserSchema.pre("findOneAndUpdate", function(next){    
    this._update.password = bcrypt.hashSync(this._update.password, 10);
    next();
});

const User = mongoose.model("User", UserSchema);

export default User;
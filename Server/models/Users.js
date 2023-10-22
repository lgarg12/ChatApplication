const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    token:{
        type: String,
    }
});

const Users = mongoose.model('Users',UserSchema);

module.exports = Users;
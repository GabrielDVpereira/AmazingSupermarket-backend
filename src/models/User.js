const config = require('../config/default.json');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlenght: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    //An admin user will be the a seller that can also sell their products
});

//function that will generate the AuthToken
UserSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, config.myprivatekey)
    return token;
}

const User = mongoose.model('User', UserSchema);

//Validates the attributes of the user using joi, the methods appended to joi are the validations to be made
function validateUser(user){
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;

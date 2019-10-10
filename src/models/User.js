const config = require('config');
const jwt = require('jsonwebtoken');
const joi = require('joi');
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
    isAdmin: Boolean
});
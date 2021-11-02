const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "Please provide First Name"],
        maxlength: 10,
        minlength: 3
    },
    secondName:{
        type: String,
        maxlength: 10,
    },
    userName:{
        type: String,
        unique: [true, "username must be unique"],
        required: [true, "Please provide User Name"],
        maxlength: 20,
        minlength: 3
    },
    email:{
        type: String,
        unique: [true, "Email must be unique"],
        required: [true, "Please provide Email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please provide a valid email"]
    },
    password:{
        type: String,
        minlength: 8,
        required: [true, 'Please provide a password']
    },

})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createToken = function (){
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

UserSchema.methods.validatePassword = function(user_password){
    return bcrypt.compare(user_password, this.password);
} 

module.exports = mongoose.model('User', UserSchema);
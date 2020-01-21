const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const EXP_DAYS = 1;

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

UserSchema.methods.generateJWT = function(){
    const today = new Date();
    const expDate = new Date(today);
    expDate.setDate(today.getDate() + EXP_DAYS);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expDate.getTime() / 1000, 10)
    }, process.env.JWT_SECRET);
}

UserSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.json = function(){
    return {
        _id: this._id,
        email: this.email,
    };
}

UserSchema.methods.authJson = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT()
    };
}

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
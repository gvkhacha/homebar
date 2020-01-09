const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const EXP = 1; // should be later set to ~60

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

UserSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expDate = new Date(today);
    expDate.setDate(today.getDate() + EXP);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expDate.getTime() / 1000, 10)
    }, 'secret')
}

UserSchema.methods.authJson = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT()
    }
}

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
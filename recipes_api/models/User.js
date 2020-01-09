const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

UserSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.authJson = function() {
    return {
        _id: this._id,
        email: this.email,
    };
}

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
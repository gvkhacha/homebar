const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, (email, password, done) => {
    User.findOne({email}).then((user) => {
        if(!user || !user.validatePassword(password)){
            return done(null, false, {errors: 'Incorrect username or password'});
        }

        return done(null, user);
    }).catch(done);
}));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
})
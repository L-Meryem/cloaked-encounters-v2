const LocalStrategy = require("passport-local");
const User = require("../models/User");
const bcrypt = require('bcrypt');


module.exports = passport => {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user)
                    return done(null, false, {message: "the username or password you entered is incorrect"});

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    done(null, false, {message: "the username or password you entered is incorrect"});

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));


    // runs at login -> store user ID in session 
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // runs on every request -> stored id -> user object -> req.user
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

};
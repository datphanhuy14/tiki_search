var LocalStrategy = require("passport-local").Strategy;
let passport = require("passport")
const db = require('./db');

module.exports = (password) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true,
            },
            async function (req, username, password, done) {
                const user = await db.user.findOne({ where: { username: username } })
                //   .then((user) => {
                if (!user) {
                    console.log("1");
                    return done(null, null);
                }
                else {
                    // let comparePass = await bcrypt.compare(req.body.password, user.password);
                    if (user.password != req.body.password) {
                        //user.password != password
                        console.log("2");
                        return done(null, false);
                    }
                    console.log("3");
                    return done(null, user);
                }
            })
    );
    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });
    passport.deserializeUser(function (user, cb) {
        cb(null, user);
    });
    return passport;

}
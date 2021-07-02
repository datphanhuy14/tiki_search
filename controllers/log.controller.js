module.exports = {
    isLogged : function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    },

    isLogout : function (req, res, next) {
        if (req.user){
            req.session.destroy()
            return next();
        }
        // ...
        res.redirect('/login');
    }
}
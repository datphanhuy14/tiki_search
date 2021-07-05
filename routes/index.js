
var express = require('express');
var router = express.Router();
let passport = require('passport')
const isLog = require('../controllers/log.controller') // Login Logout
const conTroller = require('../controllers/route.controller')

router.get('/table/:page', isLog.isLogged, conTroller.sachTongHop);
router.get('/table/', isLog.isLogged, conTroller.sachTongHop);

router.get('/tablesales/:page', isLog.isLogged, conTroller.sachThanhLy);
router.get('/tablesales/', isLog.isLogged, conTroller.sachThanhLy);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/', // chuyển hướng tới trang được bảo vệ
    failureRedirect: '/login',
    // failureFlash: "Đăng nhập không thành công." // allow flash messages
}));
router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/logout', isLog.isLogout, (req, res) => {
    res.redirect('/');
})
/* GET home page. */
router.get('/', conTroller.index);
module.exports = router;

var express = require('express');
var router = express.Router();
let passport = require('passport')
const db = require('../db');
const isLog = require('../controllers/log.controller') // Login Logout


router.get('/table/:page',isLog.isLogged ,async function(req, res) {
  let limitPagi = 20;
  let page = req.params.page || 1;
  let getAll = await db.book.findAndCountAll({
    where : {
      phan_loai : 0
    },
    offset: (page - 1) * limitPagi,
    limit: limitPagi,
    raw: true,
  })
  // for (let i of getAll.rows){
  //   if(i.phan_loai == 0){
  //     _arr.push(i)
  //   }
  // }
  let countPage = Math.ceil(getAll.count / limitPagi)
  res.render('table', {data: getAll.rows,pages: countPage , current : parseInt(page),entries: getAll.count, user:req.user});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
  failureRedirect: '/login',
  // failureFlash: "Đăng nhập không thành công." // allow flash messages
}));
router.get('/login',(req, res) => {
  res.render('login');
})



router.get('/logout', isLog.isLogout)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

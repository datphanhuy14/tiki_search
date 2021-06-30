var express = require('express');
var router = express.Router();



router.get('/table',function(req, res) {
  res.render('table');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

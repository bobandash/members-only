var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-up-form');
});

router.get('/login', function(req, res, next) {
  res.render('log-in-form');
});

router.post('/', userController.user_create)
router.post('/login', userController.user_login);



module.exports = router;
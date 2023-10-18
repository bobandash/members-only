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

router.get('/secret-riddle', function(req, res, next) {
  res.render('secret-riddle');
})

router.post('/', userController.user_create)
router.post('/login', userController.user_login);
router.post('/secret-riddle', userController.user_get_post_privileges)


module.exports = router;
var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const messageController = require('../controller/messageController');

/* GET home page. */
router.get('/', messageController.index);


router.get('/login', function(req, res, next){
  if(req.user){
    res.send("You are already signed in");
  } else {
    res.render('log-in-form');
  }
})
router.get('/signup', function(req, res, next){
  if(req.user){
    res.send("You are already signed in");
  } else {
    res.render('sign-up-form');
  }
})
router.get('/write-post', function(req, res, next){
  res.render('new-message-form');
})

router.get('/log-out', function(req, res, next) {
  req.logout((err) => {
    if(err) {
      // TO-DO: google what this means
      return next(err);
    }
    res.redirect('/');
  });
})

router.get('/secret-riddle', function(req, res, next) {
  res.render('secret-riddle');
})

router.post('/signup', userController.user_create)
router.post('/login', userController.user_login);
router.post('/secret-riddle', userController.user_get_post_privileges)
router.post('/write-post', messageController.write_post)

module.exports = router;
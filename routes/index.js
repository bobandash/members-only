var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const messageController = require('../controller/messageController');

/* GET home page. */

function redirectHomeUserSignedIn(req, res, next){
  if(req.user){
    res.redirect('/');
  } else {
    next();
  }
}

function redirectHomeUserIsMember(req, res, next){
  if(req.user && req.user.isMember){
    res.redirect('/');
  } else {
    next();
  }
}

function redirectHomeUserIsAdmin(req, res, next){
  if(req.user && req.user.isAdmin){
    res.redirect('/');
  } else {
    next();
  }
}

router.get('/', messageController.index);
router.get('/403', function(req, res, next){
  res.render('403-page');
})
router.get('/login', redirectHomeUserSignedIn, function(req, res, next){
  if (req.session.messages) {
    res.render('log-in-form', {
      errorMessage: req.session.messages
    })
  } else {
    res.render('log-in-form');
  }
})

router.get('/signup', redirectHomeUserSignedIn, function(req, res, next){
  res.render('sign-up-form');
})

router.get('/write-post', function(req, res, next){
  if(req.user && req.user.isMember){
    res.render('new-message-form');
  } else {
    res.redirect('403');
  }
})

router.get('/log-out', function(req, res, next) {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    res.redirect('/');
  });
})

router.get('/secret-riddle', redirectHomeUserIsMember, function(req, res, next){
  res.render('secret-riddle');
})

router.get('/secret-route', redirectHomeUserIsAdmin, function(req,res, next) {
  res.render('secret-route');
})

router.get('/edit/:messageId', messageController.edit_message_form)

router.get('/delete/:messageId', messageController.delete_message)

router.post('/signup', userController.user_create)
router.post('/login', userController.user_login);
router.post('/secret-riddle', userController.user_get_post_privileges)
router.post('/write-post', messageController.write_post)
router.post('/secret-route',userController.user_get_delete_priviledges)
router.post('/edit/:messageId', messageController.submit_message_form)
module.exports = router;
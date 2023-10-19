var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const messageController = require('../controller/messageController');
const errorController = require('../controller/errorController');

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

router.get('/login', redirectHomeUserSignedIn, userController.login_form)
router.get('/signup', redirectHomeUserSignedIn, userController.signup_form)

router.get('/write-post', userController.new_message_form)

router.get('/log-out', userController.logout)
router.get('/secret-riddle', redirectHomeUserIsMember, userController.member_priviledges)
router.get('/secret-route', redirectHomeUserIsAdmin, userController.admin_priviledges)

/*for errors */
router.get('/403', errorController.permission_denied);

/*for user operations*/
router.post('/signup', userController.user_create)
router.post('/login', userController.user_login);
router.post('/secret-riddle', userController.user_get_post_privileges)
router.post('/write-post', messageController.write_post)
router.post('/secret-route',userController.user_get_delete_priviledges)

/*for messages*/
router.get('/', messageController.index);
router.get('/edit/:messageId', messageController.edit_message_form)
router.get('/delete/:messageId', messageController.delete_message)
router.post('/edit/:messageId', messageController.submit_message_form)

module.exports = router;
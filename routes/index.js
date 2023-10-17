var express = require('express');
var router = express.Router();
const userController = require('../controller/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sign-up-form');
});

router.post('/', userController.user_create)

module.exports = router;
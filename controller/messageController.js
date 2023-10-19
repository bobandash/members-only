const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler')
const Message = require('../models/messages')
const User = require('../models/user')
const he = require('he');


exports.index = asyncHandler(async (req, res, next) => {
  let messages;
  if (!req.user) {
    messages = await Message.find({});
  } else {
    messages = await Message.find({}).populate('user');
  }

  messages.forEach(message => {
    message.title = he.decode(message.title);
    message.message = he.decode(message.message);
    if (message.user.name) {
      message.user.name = he.decode(message.user.name);
    }
  });

  res.render('index', {
    messages: messages
  });
})

exports.write_post = [
  body('post-title')
    .trim()
    .notEmpty()
    .withMessage('Post title cannot be empty')
    .escape(),
  body('post-message')
    .trim()
    .notEmpty()
    .withMessage('Post message cannot be empty')
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).mapped();
    if(Object.keys(errors).length > 0) {
      res.render('new-message-form', {
        errors: errors
      })
    } else {
      const user = req.user;
      const newMessage = new Message({
        user: user.id,
        title: req.body["post-title"],
        message: req.body["post-message"]
      })
      await newMessage.save();
      res.redirect('/')
    }
  })
]
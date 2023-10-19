const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler')
const Message = require('../models/messages')
const User = require('../models/user')
const he = require('he');


exports.index = asyncHandler(async (req, res, next) => {
  let messages;
  if (!req.user) {
    messages = await Message.find({}).sort({timeStamp: -1});
  } else {
    messages = await Message.find({}).populate('user').sort({timeStamp: -1});
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
      const formValues = {
        title: req.body["post-title"],
        message: req.body["post-message"]
      }
      res.render('new-message-form', {
        errors: errors,
        formValues: formValues
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

exports.delete_message = asyncHandler(async (req, res, next) => {
  const messageId = req.params.messageId;
  await Message.findByIdAndRemove(messageId);
  res.redirect('/');
})

exports.edit_message_form = asyncHandler(async (req, res, next) => {
  const messageId = req.params.messageId;
  const message = await Message.findById(messageId);

  res.render('edit-message-form', {
    title: he.decode(message.title),
    message: he.decode(message.message),
    id: message.id
  })
})

exports.submit_message_form =  [
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
    const [title, message] = 
    [
      req.body["post-title"],
      req.body["post-message"]
    ]
    const messageId = req.params.messageId;
    if(Object.keys(errors).length > 0) {
      res.render('edit-message-form', {
        errors: errors,
        title: title,
        message: message,
        id: messageId
      })
    } else {
      await Message.findByIdAndUpdate(messageId, {
        title: title,
        message: message
      })
      res.redirect('/')
    }
  })
]
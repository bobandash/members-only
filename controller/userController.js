const {body, validationResult} = require('express-validator');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')
const passport = require('passport');

async function emailExists(email){
  const existingUser = await User.findOne({email: email});
  if(!existingUser){
    throw new Error('Email already in use')
  }
  return true;
}


exports.user_create = [
  body('full-name')
    .trim()
    .notEmpty()
    .withMessage('Full name cannot be empty')
    .escape(),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(emailExists)
    .withMessage('Account already exists')
    .escape(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({min: 6})
    .withMessage('Password has to be at least 6 characters')
    .escape(),
  body('confirm-password', 'Password has to match')
    .custom((value, {req}) => {
      return value === req.body.password;
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).mapped();
    if(Object.keys(errors).length > 0) {
      res.render('sign-up-form', {
        errors: errors
      })
    }
    else {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        const newUser = new User({
          name: req.body["full-name"],
          email: req.body.email,
          password: hashedPassword
        })
        await newUser.save();
        res.redirect('/');
      })
    }
  })
]

exports.user_login = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req).mapped();
    if(Object.keys(errors).length > 0) {
      res.render('log-in-form', {
        errors: errors
      })
    }
    else {
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
      })(req, res, next);
    }
  }
]
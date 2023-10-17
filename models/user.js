const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Not a valid email'
    }
  },
  password: {
    type: String,
    required: true
  },
  isMember: {
    type: Boolean,
    required: true,
    default: false
  }
})


modules.export = mongoose.model("Users", UserSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model("Messages", MessagesSchema);
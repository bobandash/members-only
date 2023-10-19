const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DateTime} = require('luxon');

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

MessagesSchema.virtual('dateFormatted').get(function() {
  return this.timeStamp.toLocaleString(DateTime.DATETIME_MED)
});

module.exports = mongoose.model("Messages", MessagesSchema);
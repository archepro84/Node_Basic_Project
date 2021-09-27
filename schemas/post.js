const mongoose = require("mongoose");
const { Schema } = mongoose;
const postSchema = new Schema({
  // postId: {
  //     type: Number,
  //     required: true,
  //     unique: true,
  // },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(`Post`, postSchema);

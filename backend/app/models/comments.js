const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  commentText: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  userName: {
    type: String,
  },
  userImage: {
    type: String,
  },
  postId: {
    type: Schema.Types.ObjectId,
  },
});

const Comment = mongoose.model("Comment", newSchema);

module.exports = Comment;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new mongoose.Schema({
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

const Like = mongoose.model("Like", newSchema);

module.exports = Like;

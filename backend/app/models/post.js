const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
  likes: [
    {
      type: String,
    },
  ],
  profile: {
    type: String,
  },
  userName: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
  },
  time: {
    type: Date,
  },
});

const Post = mongoose.model("Post", newSchema);

module.exports = Post;

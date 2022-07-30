const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: Schema.Types.Mixed,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  followers: [
    {
      name: { type: String },
      image: { type: String },
      id: { type: Schema.Types.ObjectId },
    },
  ],

  following: [
    {
      name: { type: String },
      image: { type: String },
      id: { type: Schema.Types.ObjectId },
    },
  ],

  posts: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  stories: [{ type: String }],
});

const User = mongoose.model("User", newSchema);

module.exports = User;

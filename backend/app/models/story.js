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

  stories: [
    {
      type: String,
    },
  ],
});

const Story = mongoose.model("Story", newSchema);

module.exports = Story;

const Comment = require("../models/comments");

module.exports.create = async (req, res) => {
  const body = req.body;
  try {
    const commentBody = new Comment({
      commentText: body.comment,
      userId: body.adminId,
      userName: body.user,
      userImage: body.image,
      postId: body.postId,
    });
    const response = await commentBody.save();
    // res.json({ postSuccess: response });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

module.exports.list = async (req, res) => {
  const id = req.params.id;
  try {
    const comments = await Comment.find({
      postId: id,
    });
    res.json({ success: comments });
    console.log("leee", comments);
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

module.exports.lists = async (req, res) => {
  const id = req.body.adminId;
  try {
    const comments = await Comment.find();
    res.json({ commentsSuccess: comments.reverse() });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

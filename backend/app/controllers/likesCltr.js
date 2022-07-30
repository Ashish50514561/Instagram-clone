const Like = require("../models/likes");

module.exports.create = async (req, res) => {
  const body = req.body;
  console.log("ffffffffffffff", body);

  try {
    const likeExists = await Like.findOne({
      userId: body.adminId,
      postId: req.params.id,
    });

    if (!likeExists) {
      const newLike = new Like({
        userId: body.adminId,
        userName: body.user,
        userImage: body.image,
        postId: req.params.id,
      });
      const like = await newLike.save();
    }
  } catch (err) {
    console.log({ err });
    res.json({ error: err });
  }
};

module.exports.lists = async (req, res) => {
  try {
    const likes = await Like.find();
    console.log({ likes });
    res.json({ likesSuccess: likes });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports.delete = async (req, res) => {
  const postId = req.params.id;
  const adminId = req.body.adminId;
  console.log("delete", postId, adminId);
  try {
    const likes = await Like.findOneAndDelete({
      postId: postId,
      userId: adminId,
    });
    console.log({ likes });
  } catch (err) {
    res.json({ error: err });
  }
};

const Post = require("../models/post");
const Comment = require("../models/comments");
const multer = require("multer");
const path = require("path");
const moment = require("moment");

const storage = multer.diskStorage({
  destination: "/home/ashish/Desktop/instagram/frontend/public/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("image");

module.exports.create = async (req, res) => {
  const id = req.body.adminId;
  const profile = req.body.image;
  const userName = req.body.user;
  const date = moment();
  console.log(date);

  upload(req, res, async (err) => {
    const image = req.file.path.split("public")[1];
    try {
      const post = new Post({
        image: image,
        userId: id,
        profile: profile,
        userName: userName,
        time: date,
      });
      const response = await post.save();

      console.log({ response });
      res.json({ postSuccess: response });
    } catch (err) {
      res.json({ error: err });
      console.log(err);
    }
  });
};

module.exports.lists = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ success: posts.reverse() });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

module.exports.list = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id });
    res.json({ successUserPosts: posts });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

module.exports.viewPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({ successViewPost: post });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

module.exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    const comments = await Comment.deleteMany({ postId: req.params.id });
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

module.exports.like = async (req, res) => {
  const id = req.params.id;
  try {
    const checkLike = await Post.findById(id);
    if (!checkLike.likes.includes(req.body.user)) {
      const post = await Post.findByIdAndUpdate(id, {
        $push: { likes: req.body.user },
      });
      console.log("aeee", post);
      //   res.json({ success: posts });
    }
  } catch (err) {
    console.log(err);
    res.json({ error: err });
  }
};

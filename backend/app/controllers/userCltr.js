const User = require("../models/user");
const Post = require("../models/post");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../secretkeys/secretKey");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

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
  upload(req, res, async (err) => {
    const body = req.body;
    const image = req.file.path.split("public")[1];

    try {
      const salt = await bcryptjs.genSalt();
      const hashedPassword = await bcryptjs.hash(body.password, salt);
      const user = await new User({
        ...body,
        password: hashedPassword,
        image: image,
      });
      const response = await user.save();
      console.log({ response });
      res.json({ success: response });
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  });
};

module.exports.login = async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findOne({ email: body.email });
    if (!user) {
      res.json({ error: "invalid email or password" });
    } else {
      const validUser = await bcryptjs.compare(body.password, user.password);
      if (!validUser) {
        res.json({ error: "invalid email or password" });
      } else {
        const tokenData = {
          name: user.name,
          id: user._id,
          image: user.image,
        };
        const token = jwt.sign(tokenData, secretKey);
        res.json({ successToken: `bearer ${token}` });
      }
    }
  } catch (err) {
    console.log("fuuckk error", err);
    res.json({ error: err });
  }
};

// module.exports.story = async (req, res) => {
//   const id = req.body.adminId;
//   console.log(id);
//   upload(req, res, async (err) => {
//     try {
//       const image = req.file.path.split("public")[1];

//       const user = await User.findByIdAndUpdate(
//         id,
//         {
//           $push: { stories: image },
//         },
//         { new: true }
//       );
//       res.json({ uploadSuccess: "uploaded" });
//     } catch (err) {
//       res.json({ error: err });
//     }
//   });
// };

module.exports.lists = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: users });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports.list = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.json({ successUser: user });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports.profile = async (req, res) => {
  const id = req.body.adminId;
  upload(req, res, async (err) => {
    const image = req.file.path.split("public")[1];
    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          image: image,
        },
        { new: true }
      );
      res.json({ profileSuccess: user });
      const posts = await Post.updateMany({ userId: id }, { profile: image });
    } catch (err) {
      res.json({ error: err });
    }
  });
};

module.exports.listAdmin = async (req, res) => {
  const id = req.body.adminId;
  try {
    const user = await User.findById(id);
    res.json({ successUser: user });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports.addFollower = async (req, res) => {
  const id = req.body.adminId;
  try {
    //check if the follower already exist
    const checkAdmin = await User.findById(id);
    let exists = checkAdmin.following.find((item) => {
      return item.id == req.body.followingId;
    });
    if (!exists) {
      const admin = await User.findByIdAndUpdate(
        id,
        {
          $push: {
            following: {
              name: req.body.following,
              image: req.body.followingImage,
              id: req.body.followingId,
            },
          },
        },
        { new: true }
      );
      console.log("admin", admin);
    }
    //update target follower
    const user = await User.findById(req.body.followingId);
    let followerExists = user.followers.find((item) => {
      return item.id == id;
    });
    if (!followerExists) {
      const updatedUserFollowers = await User.findByIdAndUpdate(
        req.body.followingId,
        {
          $push: {
            followers: {
              name: req.body.user,
              image: req.body.image,
              id: req.body.adminId,
            },
          },
        },
        { new: true }
      );
      console.log({ updatedUserFollowers });
    }
    // res.json({ successUser: user });
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports.removeFollower = async (req, res) => {
  const followerId = req.params.id;
  const adminId = req.body.adminId;
  const admin = await User.findByIdAndUpdate(
    adminId,
    {
      $pull: { followers: { _id: followerId } },
    },
    { new: true }
  );
};

module.exports.removeFollowing = async (req, res) => {
  const followingId = req.params.id;
  console.log("fucckkkkkkkk", followingId);
  const adminId = req.body.adminId;
  const admin = await User.findByIdAndUpdate(
    adminId,
    {
      $pull: { following: { id: followingId } },
    },
    { new: true }
  );
};

module.exports.unfollow = async (req, res) => {
  const id = req.params.id;
  console.log("le user id ", id);
  const adminId = req.body.adminId;
  const admin = await User.findByIdAndUpdate(
    adminId,
    {
      $pull: { following: { id: id } },
    },
    { new: true }
  );
  const user = await User.findByIdAndUpdate(
    id,
    {
      $pull: { followers: { id: adminId } },
    },
    { new: true }
  );

  console.log("fuckagain", user);
};

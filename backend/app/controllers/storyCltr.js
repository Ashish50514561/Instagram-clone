const Story = require("../models/story");
const multer = require("multer");
const path = require("path");

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

module.exports.story = async (req, res) => {
  const id = req.body.adminId;
  const userImage = req.body.image;
  const userName = req.body.user;

  upload(req, res, async (err) => {
    try {
      const image = req.file.path.split("public")[1];
      const storyExists = await Story.findOne({ userId: id });

      if (storyExists) {
        const story = await Story.findOneAndUpdate(
          { userId: id },
          {
            $push: { stories: image },
          },
          { new: true }
        );
        res.json({ uploadSuccess: "uploaded" });
      } else {
        //create new story
        const newStory = new Story({
          userId: id,
          userImage: userImage,
          userName: userName,
        });
        const story = await newStory.save();
        //push image to story
        const updatedStory = await Story.findByIdAndUpdate(
          story._id,
          {
            $push: { stories: image },
          },
          { new: true }
        );
        res.json({ uploadSuccess: "uploaded" });
      }
    } catch (err) {
      console.log({ err });
      res.json({ error: err });
    }
  });
};

module.exports.lists = async (req, res) => {
  try {
    const stories = await Story.find();
    res.json({ storySuccess: stories.reverse() });
  } catch (err) {
    res.json({ error: err });
    console.log({ err });
  }
};

module.exports.list = async (req, res) => {
  const id = req.params.id;
  try {
    const story = await Story.findById(id);
    res.json({ soloSuccess: story });
  } catch (err) {
    res.json({ error: err });
    console.log({ err });
  }
};

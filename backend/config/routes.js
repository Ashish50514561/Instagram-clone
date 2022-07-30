const express = require("express");
const user = require("../app/controllers/userCltr");
const post = require("../app/controllers/postCltr");
const comment = require("../app/controllers/commentCltr");
const stories = require("../app/controllers/storyCltr");
const like = require("../app/controllers/likesCltr");

const {
  adminAuthentification,
} = require("../app/middlewares/authentification");
const Router = express.Router();

Router.get("/users", user.lists);
Router.get("/user/:id", user.list);
Router.delete(
  "/removeFollower/:id",
  adminAuthentification,
  user.removeFollower
);
Router.delete(
  "/removeFollowing/:id",
  adminAuthentification,
  user.removeFollowing
);
Router.delete("/unfollow/:id", adminAuthentification, user.unfollow);
Router.get("/admin", adminAuthentification, user.listAdmin);
Router.post("/addFollower", adminAuthentification, user.addFollower);
Router.post("/signup", user.create);
Router.post("/profile", adminAuthentification, user.profile);
Router.post("/login", user.login);

Router.post("/story", adminAuthentification, stories.story);
Router.get("/story", adminAuthentification, stories.lists);
Router.get("/getStory/:id", adminAuthentification, stories.list);

Router.post("/like/:id", adminAuthentification, like.create);
Router.delete("/like/:id", adminAuthentification, like.delete);
Router.get("/likes/", like.lists);

Router.post("/addPost", adminAuthentification, post.create);
Router.get("/posts", post.lists);
Router.get("/userPosts/:id", post.list);
Router.get("/viewPost/:id", post.viewPost);
Router.delete("/post/:id", post.deletePost);

// Router.get("/like/:id", adminAuthentification, post.like);

Router.post("/postComment", adminAuthentification, comment.create);
Router.get("/comments/:id", comment.list);
Router.get("/allComments/", adminAuthentification, comment.lists);

module.exports = Router;

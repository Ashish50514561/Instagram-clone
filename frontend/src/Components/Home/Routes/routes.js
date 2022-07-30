import React from "react";
import { Route, Routes } from "react-router-dom";
import Comments from "../Body/comments/Comments";
import Followers from "../Body/followers/Followers";
import Following from "../Body/followers/Following";
import Likes from "../Body/Likes/Likes";
import Profile from "../Body/Profile/Profile";
import Viewpost from "../Body/Profile/Viewpost";
import Search from "../Body/Search/Search";
import Story from "../Body/stories/Story";
import Users from "../Body/Users/Users";
import AddPost from "../Forms/AddPost";
import Addstory from "../Forms/Addstory";
import Login from "../Forms/Login";
import Profilepic from "../Forms/Profilepic";
import Signup from "../Forms/Signup";
import Home from "../Home";

export default function routes() {
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/story/:id" element={<Story />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route exact path="/postStory" element={<Addstory />} />
      <Route exact path="/addPost" element={<AddPost />} />
      <Route exact path="/comments/:id" element={<Comments />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/updateProfile" element={<Profilepic />} />
      <Route exact path="/user/:id" element={<Users />} />
      <Route exact path="/followers/:id/:ping" element={<Followers />} />
      <Route exact path="/following/:id/:ping" element={<Following />} />
      <Route exact path="/viewPost/:id/:ping" element={<Viewpost />} />
      <Route exact path="/search" element={<Search />} />
      <Route exact path="/likes/:id" element={<Likes />} />
    </Routes>
  );
}

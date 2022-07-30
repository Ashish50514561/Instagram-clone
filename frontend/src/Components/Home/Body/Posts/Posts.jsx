import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetPosts } from "../../../../Redux/actions/postActions";
import { asyncGetLikes } from "../../../../Redux/actions/likeActions";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  const likes = useSelector((state) => state.likeReducer);

  console.log({ posts });

  useEffect(() => {
    dispatch(asyncGetPosts());
    dispatch(asyncGetLikes());
  }, []);

  return (
    <Grid item>
      {posts.hasOwnProperty("success") &&
        likes.hasOwnProperty("likesSuccess") &&
        posts.success.map((post, i) => {
          return <Post key={post._id} post={post} likes={likes.likesSuccess} />;
        })}
    </Grid>
  );
}

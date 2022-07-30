import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TelegramIcon from "@mui/icons-material/Telegram";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  asyncLike,
  asyncGetLikes,
  asyncDeleteLike,
} from "../../../../Redux/actions/likeActions";
import { asyncGetPosts } from "../../../../Redux/actions/postActions";
import { asyncGetAdmin } from "../../../../Redux/actions/adminActions";
import { faHeart as BigHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  asyncPostComment,
  asyncGetAllComments,
} from "../../../../Redux/actions/commentsActions";
import {
  Grid,
  Stack,
  TextField,
  Box,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";

export default function Post(props) {
  const { post, likes } = props;
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [animate, setAnimate] = useState(false);
  const [mainHeart, setMainHeart] = useState(false);
  const [postComment, setPostComment] = useState(false);

  const admin = useSelector((state) => state.adminReducer);
  const comments = useSelector((state) => state.commentReducer);

  const lastComment =
    comments.hasOwnProperty("commentsSuccess") &&
    comments.commentsSuccess.find((comment) => comment.postId === post._id);
  console.log("uuuserrrrrr", likes);

  const totalComments =
    comments.hasOwnProperty("commentsSuccess") &&
    comments.commentsSuccess.filter((comment) => comment.postId === post._id);

  const postLikes = likes.filter((like) => like.postId === post._id);

  //check if post is already liked
  let alreadyLiked =
    admin.hasOwnProperty("successUser") &&
    postLikes.length > 0 &&
    postLikes.find((like) => like.userId == admin.successUser._id);

  const handleDeleteLike = () => {
    dispatch(asyncDeleteLike(post._id));
    setTimeout(() => dispatch(asyncGetLikes()), 1000);
  };

  const handleLike = (e) => {
    if (e.detail === 2) {
      setLiked(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 900);
      setMainHeart(true);
      setTimeout(() => setMainHeart(false), 900);
      dispatch(asyncLike(post._id));
      setTimeout(() => dispatch(asyncGetLikes()), 1000);
    }
  };

  const iconLike = (e) => {
    setLiked(true);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 900);
    setMainHeart(true);
    setTimeout(() => setMainHeart(false), 900);
    dispatch(asyncLike(post._id));
    setTimeout(() => dispatch(asyncGetLikes()), 1000);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = () => {
    const formData = { comment, postId: post._id };
    dispatch(asyncPostComment(formData));
    setComment("");
    setPostComment(false);
    setTimeout(() => dispatch(asyncGetAllComments()), 1500);
  };

  useEffect(() => {
    dispatch(asyncGetAllComments());
    dispatch(asyncGetAdmin());
  }, []);

  useEffect(() => {
    //render red heartto liked post
    alreadyLiked && setLiked(true);
  }, [admin, alreadyLiked]);

  return (
    <Box>
      {admin.hasOwnProperty("successUser") &&
        comments.hasOwnProperty("commentsSuccess") && (
          <Grid sx={{ position: "relative" }} container>
            <Grid
              aria-label="top-post-header"
              sx={{ position: "absolute", top: 0 }}
              item
              xs={12}
            >
              <Stack
                sx={{ width: "100vw" }}
                pt={0.8}
                pb={0.8}
                direction="row"
                justifyContent="space-between"
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/user/${post.userId}`}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Box
                        className="storiesBorder"
                        p={0.25}
                        sx={{
                          borderRadius: "50%",
                        }}
                      >
                        <Box bgcolor="white" p={0.2} borderRadius="50%">
                          <Avatar
                            sx={{ height: 30, width: 30 }}
                            src={post.profile}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <Typography
                      sx={{ fontSize: "14px", fontWeight: 700 }}
                      color="white"
                      pt={1.3}
                      pl={1}
                    >
                      {post.userName}
                    </Typography>
                  </Stack>
                </Link>

                <Stack justifyContent="center">
                  <MoreVertIcon sx={{ color: "white" }} />
                </Stack>
              </Stack>
            </Grid>

            <Grid item aria-label="image" sx={{ height: "65vh" }}>
              <Box onClick={handleLike} sx={{ height: "65vh" }}>
                {mainHeart && (
                  <Box sx={{ position: "absolute", top: "36%", left: "36%" }}>
                    <IconButton sx={{ height: "100px", width: "100px" }}>
                      <FontAwesomeIcon
                        class="fa-beat"
                        color="white"
                        icon={BigHeart}
                      />
                    </IconButton>
                  </Box>
                )}
                <img src={post.image} />
              </Box>
            </Grid>

            <Grid aria-label="post-icons" xs={12} item>
              <Stack
                bgcolor="white"
                direction="row"
                justifyContent="space-between"
              >
                <Stack
                  spacing={0.5}
                  direction="row"
                  justifyContent="space-between"
                >
                  <IconButton onClick={() => setLiked(!liked)}>
                    {liked ? (
                      liked && animate ? (
                        <FontAwesomeIcon
                          class="fa-beat"
                          color="red"
                          icon={solidHeart}
                        />
                      ) : (
                        <FontAwesomeIcon
                          // class="fa-beat"
                          onClick={handleDeleteLike}
                          color="red"
                          icon={solidHeart}
                        />
                      )
                    ) : (
                      <FontAwesomeIcon
                        onClick={iconLike}
                        color="black"
                        icon={faHeart}
                      />
                    )}
                  </IconButton>

                  <IconButton>
                    <Link to={`/comments/${post._id}`}>
                      <FontAwesomeIcon
                        flip="horizontal"
                        color="black"
                        icon={faComment}
                      />
                    </Link>
                  </IconButton>

                  <IconButton>
                    <TelegramIcon sx={{ color: "black", fontSize: 30 }} />
                  </IconButton>
                </Stack>

                <Stack>
                  <IconButton>
                    <TurnedInNotIcon sx={{ color: "black", fontSize: 27 }} />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>

            <Grid aria-label="likes-length" xs={12} item>
              <Link
                to={`/likes/${post._id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Stack ml={1.5}>
                  <Typography sx={{ fontSize: "16px", fontWeight: 515 }}>
                    {postLikes.length} likes
                  </Typography>
                </Stack>
              </Link>
            </Grid>

            <Grid aria-label="comments" xs={12} item>
              <Stack spacing={1} ml={1.5} direction="row">
                <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                  {lastComment && lastComment.userName}
                </Typography>
                <Typography sx={{ fontSize: "15px", fontWeight: 200 }}>
                  {lastComment && lastComment.commentText}
                </Typography>
              </Stack>
            </Grid>

            <Grid aria-label="view-comments" xs={12} item>
              {totalComments.length > 0 && (
                <Stack ml={1.5}>
                  <Link
                    to={`/comments/${post._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontSize: "15px",
                        fontWeight: 200,
                      }}
                    >
                      {`View all
                ${totalComments.length}
                comments`}
                    </Typography>
                  </Link>
                </Stack>
              )}
            </Grid>

            <Grid aria-label="post-comment" mb={1} xs={12} item>
              <Stack ml={1.5} direction="row">
                <Box pt={0.5}>
                  <Avatar
                    sx={{ height: 30, width: 30 }}
                    src={
                      admin.hasOwnProperty("successUser") &&
                      admin.successUser.image
                    }
                  />
                </Box>

                <Box pt={0.5}>
                  <TextField
                    value={comment}
                    onFocus={() => setPostComment(true)}
                    onBlur={() => setTimeout(() => setPostComment(false), 1000)}
                    onChange={handleChange}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    variant="standard"
                    placeholder="Add a comment..."
                    sx={{
                      height: "30px",
                      ml: 2,
                      border: "none",
                    }}
                  />
                </Box>

                <Box
                  onClick={handleComment}
                  sx={!postComment && { display: "none" }}
                >
                  <IconButton>
                    <Typography ml={2.5} color="primary.main">
                      Post
                    </Typography>
                  </IconButton>
                </Box>
              </Stack>
            </Grid>

            <Grid aria-label="post-time" xs={12} item>
              <Stack ml={1.5} mb={1}>
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "10px",
                    fontWeight: 200,
                  }}
                >
                  15 minutes ago
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        )}
    </Box>
  );
}

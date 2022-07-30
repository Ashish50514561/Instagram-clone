import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TelegramIcon from "@mui/icons-material/Telegram";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as BigHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { asyncGetPost } from "../../../../Redux/actions/postActions";
import { asyncGetAdmin } from "../../../../Redux/actions/adminActions";
import { useSelector, useDispatch } from "react-redux";
import { asyncMenu } from "../../../../Redux/actions/menuAction";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "../../footer/Footer";
import UploadMenu from "../Menu/UploadMenu";
import Sidebar from "../sidebar/Sidebar";
import {
  asyncGetLikes,
  asyncDeleteLike,
  asyncLike,
} from "../../../../Redux/actions/likeActions";
import {
  asyncPostComment,
  asyncGetComments,
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

export default function ViewPost(props) {
  const { id, ping } = useParams();
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [animate, setAnimate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mainHeart, setMainHeart] = useState(false);
  const [postComment, setPostComment] = useState(true);
  const post = useSelector((state) => state.postReducer);
  const likes = useSelector((state) => state.likeReducer);
  const admin = useSelector((state) => state.adminReducer);
  const comments = useSelector((state) => state.commentReducer);

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
    dispatch(asyncMenu(true));
  };

  // const handleLike = (e) => {
  //   if (e.detail === 2) {
  //     setLiked(true);
  //     setAnimate(true);
  //     setTimeout(() => setAnimate(false), 800);
  //     setMainHeart(true);
  //     setTimeout(() => setMainHeart(false), 800);
  //   }
  //   dispatch(asyncLike(post._id));
  //   dispatch(asyncGetPost(id));
  // };

  const postLikes =
    likes.hasOwnProperty("likesSuccess") &&
    post.hasOwnProperty("successViewPost") &&
    likes.likesSuccess.filter(
      (like) => like.postId === post.successViewPost._id
    );
  console.log({ postLikes });

  //check if post is already liked
  let alreadyLiked =
    admin.hasOwnProperty("successUser") &&
    postLikes.length > 0 &&
    postLikes.find((like) => like.userId == admin.successUser._id);

  const handleDeleteLike = () => {
    dispatch(asyncDeleteLike(post.successViewPost._id));
    setTimeout(() => dispatch(asyncGetLikes()), 1000);
  };

  const handleLike = (e) => {
    if (e.detail === 2) {
      setLiked(true);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 900);
      setMainHeart(true);
      setTimeout(() => setMainHeart(false), 900);
      dispatch(asyncLike(post.successViewPost._id));
      setTimeout(() => dispatch(asyncGetLikes()), 1000);
    }
  };

  const iconLike = (e) => {
    setLiked(true);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 900);
    setMainHeart(true);
    setTimeout(() => setMainHeart(false), 900);
    dispatch(asyncLike(post.successViewPost._id));
    setTimeout(() => dispatch(asyncGetLikes()), 1000);
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = () => {
    const formData = { comment, postId: id };
    dispatch(asyncPostComment(formData));
    setComment("");
    setPostComment(false);
    setTimeout(() => {
      dispatch(asyncGetComments(id));
    }, 2000);
  };

  useEffect(() => {
    dispatch(asyncGetPost(id));
    dispatch(asyncGetComments(id));
    dispatch(asyncGetAdmin());
    dispatch(asyncGetLikes());

    return () => {
      dispatch(asyncMenu(false));
    };
  }, []);

  useEffect(() => {
    //render red heartto liked post
    alreadyLiked && setLiked(true);
  }, [admin, alreadyLiked]);

  return (
    <Stack alignItems="center">
      <Grid sm={8} md={7} lg={6} mt={1} sx={{ position: "relative" }} container>
        <Grid
          sx={{ position: "absolute", top: 0 }}
          aria-label="top-post-header"
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
                      src={
                        post.hasOwnProperty("successViewPost") &&
                        post.successViewPost.profile
                      }
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
                {post.hasOwnProperty("successViewPost") &&
                  post.successViewPost.userName}
              </Typography>
            </Stack>

            {ping === "profile" && (
              <Stack justifyContent="center">
                <IconButton onClick={handleMenu}>
                  <MoreVertIcon sx={{ color: "white" }} />
                </IconButton>
                <UploadMenu
                  anchorEl={anchorEl}
                  ping={"post"}
                  id={
                    post.hasOwnProperty("successViewPost") &&
                    post.successViewPost._id
                  }
                />
              </Stack>
            )}
          </Stack>
        </Grid>

        <Grid item aria-label="image" sx={{ height: "65vh" }}>
          <Box onClick={handleLike} sx={{ height: "65vh" }}>
            {mainHeart && (
              <Box sx={{ position: "absolute", top: "25%", left: "36%" }}>
                <IconButton sx={{ height: "100px", width: "100px" }}>
                  <FontAwesomeIcon
                    class="fa-beat"
                    color="white"
                    icon={BigHeart}
                  />
                </IconButton>
              </Box>
            )}
            <img
              src={
                post.hasOwnProperty("successViewPost") &&
                post.successViewPost.image
              }
            />
          </Box>
        </Grid>

        <Grid xs={12} item>
          <Stack bgcolor="white" direction="row" justifyContent="space-between">
            <Stack spacing={0.5} direction="row" justifyContent="space-between">
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
                {/* <FontAwesomeIcon
                flip="horizontal"
                color="black"
                icon={fapaperplanetop}
              /> */}
              </IconButton>
            </Stack>

            <Stack>
              <IconButton>
                <TurnedInNotIcon sx={{ color: "black", fontSize: 27 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} item>
          <Stack ml={1.5}>
            <Typography sx={{ fontSize: "16px", fontWeight: 515 }}>
              {postLikes.length} likes
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={12} item>
          <Stack spacing={1} ml={1.5} direction="row">
            <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
              {comments.hasOwnProperty("success") &&
                comments.success.length > 0 &&
                comments.success[comments.success.length - 1].userName}
            </Typography>
            <Typography sx={{ fontSize: "15px", fontWeight: 200 }}>
              {comments.hasOwnProperty("success") &&
                comments.success.length > 0 &&
                comments.success[comments.success.length - 1].commentText}
            </Typography>
          </Stack>
        </Grid>

        <Grid xs={12} item>
          {comments.hasOwnProperty("success") &&
            comments.success.length > 0 &&
            post.hasOwnProperty("successViewPost") && (
              <Stack ml={1.5}>
                <Link
                  to={`/comments/${post.successViewPost._id}`}
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
                ${comments.hasOwnProperty("success") && comments.success.length}
                comments`}
                  </Typography>
                </Link>
              </Stack>
            )}
        </Grid>

        <Grid mb={1} xs={12} item>
          <Stack ml={1.5} direction="row">
            <Box pt={0.5}>
              <Avatar
                sx={{ height: 30, width: 30 }}
                src={
                  admin.hasOwnProperty("successUser") && admin.successUser.image
                }
              />
            </Box>

            <Box pt={0.5}>
              <TextField
                value={comment}
                onFocus={() => setPostComment(false)}
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
              sx={postComment && { display: "none" }}
            >
              <IconButton>
                <Typography ml={2.5} color="primary.main">
                  Post
                </Typography>
              </IconButton>
            </Box>
          </Stack>
        </Grid>

        <Grid xs={12} item>
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
        <Box display={{ sm: "none" }}>
          <Footer />
        </Box>
      </Grid>
      <Sidebar />
    </Stack>
  );
}

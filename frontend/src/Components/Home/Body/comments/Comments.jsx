import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TelegramIcon from "@mui/icons-material/Telegram";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetAdmin } from "../../../../Redux/actions/adminActions";
import { useNavigate } from "react-router-dom";
import {
  asyncGetComments,
  asyncPostComment,
} from "../../../../Redux/actions/commentsActions";
import {
  Grid,
  Stack,
  Typography,
  Box,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";

export default function Comments() {
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentReducer);
  const admin = useSelector((state) => state.adminReducer);
  console.log({ comments });

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = () => {
    const formData = { comment, postId: id };
    dispatch(asyncPostComment(formData));
    setComment("");
    setTimeout(() => {
      dispatch(asyncGetComments(id));
    }, 1000);
  };

  useEffect(() => {
    dispatch(asyncGetComments(id));
    dispatch(asyncGetAdmin());
  }, []);

  return (
    <Stack alignItems="center">
      <Grid sm={6} pl={1} pr={1} pt={1.5} container>
        <Grid xs={12} item>
          <Stack direction="row" justifyContent="space-between">
            <Stack spacing={3} direction="row">
              <KeyboardBackspaceIcon
                onClick={() => navigate(-1)}
                sx={{ fontSize: "30px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Comments
              </Typography>
            </Stack>

            <Stack mt={0.6} direction="row"></Stack>
            <TelegramIcon sx={{ fontSize: "30px" }} />
          </Stack>
        </Grid>

        <Grid
          sx={{ maxHeight: "73vh", minHeight: "73vh", overflow: "auto" }}
          mt={1.5}
          xs={12}
          item
        >
          {comments.hasOwnProperty("success") &&
            comments.success.map((comment) => {
              return <Comment comment={comment} />;
            })}
        </Grid>
        <Grid item>
          <Stack spacing={1}>
            <Stack
              display={{ sm: "none" }}
              sx={{ width: "96vw", mt: 0.5 }}
              aria-label="emoji"
              // spacing={2.6}
              justifyContent="space-evenly"
              direction="row"
            >
              <Box sx={{ fontSize: "23px" }}> 🙌 </Box>
              <Box sx={{ fontSize: "23px" }}> 😕 </Box>
              <Box sx={{ fontSize: "23px" }}> 🔥 </Box>
              <Box sx={{ fontSize: "23px" }}> ❤️ </Box>
              <Box sx={{ fontSize: "23px" }}> 😍 </Box>
              <Box sx={{ fontSize: "23px" }}> 😮 </Box>
              <Box sx={{ fontSize: "23px" }}> 🤣 </Box>
            </Stack>

            <Stack direction="row">
              <Box>
                <Avatar
                  sx={{ height: 35, width: 35 }}
                  src={
                    admin.hasOwnProperty("successUser") &&
                    admin.successUser.image
                  }
                />
              </Box>
              <Box>
                <TextField
                  value={comment}
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

              <IconButton onClick={handleComment}>
                <Typography ml={2.5} color="primary.main">
                  Post
                </Typography>
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetLikes } from "../../../../Redux/actions/likeActions";
import { Avatar, Button, Stack, Typography, Box, Grid } from "@mui/material";

export default function Friend() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const likes = useSelector((state) => state.likeReducer);

  const postLikes =
    likes.hasOwnProperty("likesSuccess") &&
    likes.likesSuccess.filter((like) => like.postId === id);

  useEffect(() => {
    dispatch(asyncGetLikes());
  }, []);

  return (
    <Stack alignItems="center">
      <Grid
        width={{ sm: "50vw" }}
        p={2}
        sx={{
          minHeight: "90vh",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <Box>
          <Typography> Total Likes - {postLikes.length}</Typography>
        </Box>

        {postLikes &&
          postLikes.map((like) => {
            return (
              <Stack
                mt={2}
                mb={2}
                spacing={2}
                width="100%"
                justifyContent="space-between"
                direction="row"
              >
                <Link
                  to={`/user/${like.userId}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Stack spacing={2.5} direction="row">
                    <Avatar
                      sx={{ height: "55px", width: "55px" }}
                      src={like.userImage}
                    />

                    <Typography sx={{ pt: 1.5, fontWeight: 400 }}>
                      {like.userName}
                    </Typography>
                  </Stack>
                </Link>

                {/* {(ping === "adminFollowers" || ping === "adminFollowing") && ( */}
                <Box pr={0.5} pt={1}>
                  <Button
                    sx={{
                      bgcolor: "#1976d2",
                      height: "4vh",
                      color: "white",
                      // width: "25vw",
                    }}
                  >
                    Follow
                  </Button>
                </Box>
                {/* )} */}
              </Stack>
            );
          })}
      </Grid>
    </Stack>
  );
}

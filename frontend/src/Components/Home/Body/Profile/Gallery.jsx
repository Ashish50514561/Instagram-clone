import { Stack, Grid, ImageList, ImageListItem, Box } from "@mui/material";
import React from "react";
import GridOnIcon from "@mui/icons-material/GridOn";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import AirplayOutlinedIcon from "@mui/icons-material/AirplayOutlined";
import { Link } from "react-router-dom";

export default function Gallery(props) {
  const { posts, search, ping } = props;
  console.log({ posts });

  return (
    <Stack pt={2}>
      {!search && (
        <Stack
          display={{ sm: "none" }}
          width="100vw"
          justifyContent="space-evenly"
          direction="row"
          spacing={2}
        >
          <GridOnIcon />
          <MovieOutlinedIcon />
          <PlayCircleFilledWhiteOutlinedIcon />
          <AirplayOutlinedIcon />
        </Stack>
      )}

      {posts.hasOwnProperty("successUserPosts") && (
        <Grid md={12} container item>
          <Stack>
            <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
              <ImageList variant="woven" cols={3} gap={3}>
                {posts.successUserPosts.map((post) => (
                  <Link to={`/viewPost/${post._id}/${ping}`}>
                    <ImageListItem>
                      <img src={`${post.image}`} loading="lazy" alt="..." />
                    </ImageListItem>
                  </Link>
                ))}
              </ImageList>
            </Box>
          </Stack>
        </Grid>
      )}

      {posts.hasOwnProperty("success") && (
        <Grid container item>
          <Stack>
            <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
              <ImageList variant="woven" cols={3} gap={3}>
                {posts.success.map((post) => (
                  <Link to={`/viewPost/${post._id}/${ping}`}>
                    <ImageListItem>
                      <img src={`${post.image}`} loading="lazy" alt="..." />
                    </ImageListItem>
                  </Link>
                ))}
              </ImageList>
            </Box>
          </Stack>
        </Grid>
      )}
    </Stack>
  );
}

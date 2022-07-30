import React, { useEffect } from "react";
import { Grid, Stack, Box, IconButton, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MovieFilterOutlinedIcon from "@mui/icons-material/MovieFilterOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetAdmin } from "../../../Redux/actions/adminActions";

export default function Footer() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(asyncGetAdmin());
  }, []);

  return (
    <Grid
      bgcolor="white"
      width={{ xs: "100vw", sm: "50vw" }}
      position={{ xs: "relative", sm: "absolute" }}
      top={{ sm: 10 }}
      left={{ sm: 110, md: 200, lg: 270 }}
      xs={12}
      item
    >
      <Stack
        sx={{ display: "sticky", bottom: 10 }}
        direction="row"
        justifyContent="space-around"
      >
        <Box>
          <Link to="/">
            <IconButton>
              <HomeIcon sx={{ fontSize: 30, color: "text.primary" }} />
            </IconButton>
          </Link>
        </Box>

        <Box>
          <Link to="/search">
            <IconButton>
              <SearchIcon sx={{ fontSize: 30, color: "text.primary" }} />
            </IconButton>
          </Link>
        </Box>

        <Box>
          <IconButton>
            <MovieFilterOutlinedIcon
              sx={{ fontSize: 30, color: "text.primary" }}
            />
          </IconButton>
        </Box>

        <Box>
          <IconButton>
            <FavoriteBorderIcon sx={{ fontSize: 30, color: "text.primary" }} />
          </IconButton>
        </Box>

        <Box>
          <Link to="/profile">
            <IconButton>
              <Avatar
                size="large"
                sx={{ width: 33, height: 33 }}
                alt="..."
                src={
                  admin.hasOwnProperty("successUser") && admin.successUser.image
                }
              />
            </IconButton>
          </Link>
        </Box>
      </Stack>
    </Grid>
  );
}

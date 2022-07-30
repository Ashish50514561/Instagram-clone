import React, { useEffect, useState } from "react";
import People from "./People";
import Gallery from "./Gallery";
import Footer from "../../footer/Footer";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetAdmin } from "../../../../Redux/actions/adminActions";
import { asyncGetUserPosts } from "../../../../Redux/actions/postActions";
import { asyncGetUsers } from "../../../../Redux/actions/userActions";
import { asyncMenu } from "../../../../Redux/actions/menuAction";
import { asyncDrawer } from "../../../../Redux/actions/drawerActions";
import { Link } from "react-router-dom";
import UploadMenu from "../Menu/UploadMenu";
import SettingDrawer from "../Drawer/SettingDrawer";
import Sidebar from "../sidebar/Sidebar";
import {
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminReducer);
  const posts = useSelector((state) => state.postReducer);
  const users = useSelector((state) => state.userReducer);

  const handleNotificationMenu = (e) => {
    setAnchorEl(e.currentTarget);
    dispatch(asyncMenu(true));
  };

  console.log(users);
  const ping = "adminFollowers";
  const followingPing = "adminFollowing";

  useEffect(() => {
    dispatch(asyncGetAdmin());
    dispatch(asyncGetUsers());
    return () => {
      dispatch(asyncMenu(false));
    };
  }, []);

  useEffect(() => {
    admin.hasOwnProperty("successUser") &&
      dispatch(asyncGetUserPosts(admin.successUser._id));
  }, [admin]);

  return (
    <Box>
      {admin.hasOwnProperty("successUser") && (
        <Stack alignItems="center">
          <Grid container xs={12} sm={8} md={7} lg={6}>
            <Grid aria-label="top-icons" p={1.5} item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Stack spacing={1} direction="row">
                  <Box pt={0.5}>
                    <IconButton>
                      <LockOutlinedIcon />
                    </IconButton>
                  </Box>
                  <Box pt={0.4}>
                    <IconButton>
                      <Typography variant="h6" color="black">
                        {admin.successUser.name}
                      </Typography>
                    </IconButton>
                  </Box>
                </Stack>

                <Stack spacing={1.5} direction="row">
                  <IconButton>
                    <AddBoxOutlinedIcon
                      onClick={handleNotificationMenu}
                      sx={{ color: "text.primary", fontSize: 27, pb: 0.6 }}
                    />
                  </IconButton>

                  <UploadMenu anchorEl={anchorEl} ping={"upload"} />
                  <IconButton onClick={() => dispatch(asyncDrawer(true))}>
                    <FormatListBulletedIcon
                      sx={{ color: "text.primary", fontSize: 29, pb: 0.6 }}
                    />
                  </IconButton>
                  <SettingDrawer />
                </Stack>
              </Stack>
            </Grid>

            <Grid
              container
              maxHeight={{ xs: "75vh", sm: "100vh" }}
              item
              xs={12}
              sx={{ minHeight: "75vh", overflow: "auto" }}
            >
              <Grid aria-label="profile-info" xs={12} pt={1} p={1.5} item>
                <Stack spacing={2} direction="row">
                  <Stack mt={0.5}>
                    <Link to="/updateProfile">
                      <Avatar
                        sx={{ height: "80px", width: "80px" }}
                        src={admin.successUser.image}
                      />
                    </Link>
                    <Typography>{admin.successUser.name}</Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      vikasnagar #Astonishing
                    </Typography>
                  </Stack>

                  <Stack
                    aria-label="posts"
                    direction="row"
                    pr={1}
                    pt={2.8}
                    spacing={2}
                  >
                    <Stack>
                      <Box display="flex" justifyContent="center">
                        <Typography sx={{ fontWeight: 600 }}>
                          {posts.hasOwnProperty("successUserPosts")
                            ? posts.successUserPosts.length
                            : 0}
                        </Typography>
                      </Box>
                      <Box>Posts</Box>
                    </Stack>

                    <Link
                      to={`/followers/${admin.successUser._id}/${ping}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Stack aria-label="followers">
                        <Box display="flex" justifyContent="center">
                          <Typography sx={{ fontWeight: 600 }}>
                            {admin.successUser.followers.length}
                          </Typography>
                        </Box>
                        <Box>followers</Box>
                      </Stack>
                    </Link>

                    <Link
                      to={`/following/${admin.successUser._id}/${followingPing}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Stack aria-label="following">
                        <Box display="flex" justifyContent="center">
                          <Typography sx={{ fontWeight: 600 }}>
                            {admin.successUser.following.length}
                          </Typography>
                        </Box>
                        <Box>following</Box>
                      </Stack>
                    </Link>
                  </Stack>
                </Stack>

                <Stack
                  aria-label="edit profile"
                  pr={0.5}
                  direction="row"
                  mt={1.5}
                >
                  <Button
                    sx={{
                      bgcolor: "#efefef",
                      height: "5vh",
                      color: "black",
                      width: "88vw",
                    }}
                  >
                    Edit Profile
                  </Button>

                  <Box pl={0.7} pt={0.5}>
                    <PersonAddIcon />
                  </Box>
                </Stack>
              </Grid>

              <Grid
                aria-label="people"
                sx={{
                  maxWidth: "100vw",
                  overflow: "auto",
                }}
                xs={12}
                item
              >
                <Stack
                  // display={{ sm: "none" }}
                  spacing={2}
                  ml={1.5}
                  minHeight={{ sm: "27vh" }}
                  // bgcolor="white"
                  direction="row"
                  sx={{
                    maxWidth: "100vw",
                    overflow: "auto",
                  }}
                >
                  {users.hasOwnProperty("success") &&
                    users.success.map((user) => {
                      return (
                        user._id !== admin.successUser._id && (
                          <People user={user} />
                        )
                      );
                    })}
                </Stack>
              </Grid>

              <Grid aria-label="gallery" item>
                <Gallery posts={posts} ping={"profile"} />
              </Grid>
            </Grid>
            <Box display={{ sm: "none" }}>
              <Footer />
            </Box>
          </Grid>
          <Sidebar />
        </Stack>
      )}
    </Box>
  );
}

import React, { useEffect } from "react";
import Footer from "../../footer/Footer";
import Gallery from "../Profile/Gallery";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { asyncDrawer } from "../../../../Redux/actions/drawerActions";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { asyncGetUserPosts } from "../../../../Redux/actions/postActions";
import {
  asyncGetUser,
  asyncRemoveFollowing,
  asyncUnfollow,
} from "../../../../Redux/actions/userActions";
import {
  asyncGetAdmin,
  asyncAddFollower,
} from "../../../../Redux/actions/adminActions";
import {
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import SettingDrawer from "../Drawer/SettingDrawer";

export default function Users() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminReducer);
  const posts = useSelector((state) => state.postReducer);
  const user = useSelector((state) => state.userReducer);

  let checkFollowing =
    admin.hasOwnProperty("successUser") &&
    admin.successUser.following.find((user) => {
      return user.id == id;
    });

  const ping = "notAdmin";

  const handleFollower = () => {
    const formData = {
      following: user.successUser.name,
      followingId: id,
      followingImage: user.successUser.image,
    };
    dispatch(asyncAddFollower(formData));
    setTimeout(() => {
      dispatch(asyncGetUser(id));
      dispatch(asyncGetAdmin());
    }, 1500);
  };

  const handleUnfollow = () => {
    dispatch(asyncUnfollow(id));
    setTimeout(() => {
      dispatch(asyncGetUser(id));
      dispatch(asyncGetAdmin());
    }, 2000);
  };

  useEffect(() => {
    dispatch(asyncGetUser(id));
    dispatch(asyncGetUserPosts(id));
    dispatch(asyncGetAdmin());
  }, []);

  return (
    <Box>
      {user.hasOwnProperty("successUser") && (
        <Stack alignItems="center">
          <Grid sm={8} md={7} lg={6} container>
            <Grid aria-label="top-headers" p={1.5} item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Stack spacing={1} direction="row">
                  <Box pt={0.5}>
                    <IconButton>
                      <LockOutlinedIcon />
                    </IconButton>
                  </Box>
                  <Box pt={0.4}>
                    <IconButton>
                      <Typography color="black" variant="h6">
                        {user.successUser.name}
                      </Typography>
                    </IconButton>
                  </Box>
                </Stack>

                <Stack spacing={1.5} direction="row">
                  <IconButton>
                    <AddBoxOutlinedIcon
                      sx={{ color: "text.primary", fontSize: 27, pb: 0.6 }}
                    />
                  </IconButton>

                  <IconButton>
                    <FormatListBulletedIcon
                      onClick={() => dispatch(asyncDrawer(true))}
                      sx={{ color: "text.primary", fontSize: 29, pb: 0.6 }}
                    />
                  </IconButton>
                  <SettingDrawer />
                </Stack>
              </Stack>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sx={{ minHeight: "75vh", maxHeight: "75vh", overflow: "auto" }}
            >
              <Grid aria-label="profile-info" xs={12} pt={1} p={1.5} item>
                <Stack aria-label="maindata" spacing={2} direction="row">
                  <Stack mt={0.5}>
                    <Avatar
                      sx={{ height: "80px", width: "80px" }}
                      src={user.successUser.image}
                    />
                    <Typography>{user.successUser.name}</Typography>
                    <Typography sx={{ fontSize: "14px" }}>
                      vikasnagar #Astonishing
                    </Typography>
                  </Stack>

                  <Stack direction="row" pr={1} pt={2.8} spacing={2}>
                    <Stack>
                      <Box display="flex" justifyContent="center">
                        <Typography sx={{ fontWeight: 600 }}>
                          {posts.hasOwnProperty("successUserPosts") &&
                            posts.successUserPosts.length}
                        </Typography>
                      </Box>
                      <Box>Posts</Box>
                    </Stack>

                    <Link
                      to={`/followers/${id}/${ping}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Stack aria-label="followers">
                        <Box display="flex" justifyContent="center">
                          <Typography sx={{ fontWeight: 600 }}>
                            {user.successUser.followers.length}
                          </Typography>
                        </Box>
                        <Box>followers</Box>
                      </Stack>
                    </Link>

                    <Link
                      to={`/following/${id}/${ping}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Stack aria-label="following">
                        <Box display="flex" justifyContent="center">
                          <Typography sx={{ fontWeight: 600 }}>
                            {user.successUser.following.length}
                          </Typography>
                        </Box>
                        <Box>following</Box>
                      </Stack>
                    </Link>
                  </Stack>
                </Stack>

                <Stack
                  aria-label="follow-detail"
                  spacing={1}
                  pr={0.5}
                  direction="row"
                  mt={1.5}
                >
                  {checkFollowing ? (
                    <Button
                      onClick={handleUnfollow}
                      sx={{
                        bgcolor: "#efefef",
                        height: "5vh",
                        color: "black",
                        width: "44vw",
                      }}
                    >
                      unfollow
                    </Button>
                  ) : (
                    <Button
                      onClick={handleFollower}
                      variant="contained"
                      bgcolor="#0095f6"
                      sx={{
                        height: "5vh",
                        color: "white",
                        width: "40vw",
                      }}
                    >
                      Follow
                    </Button>
                  )}

                  <Button
                    sx={{
                      bgcolor: "#efefef",
                      height: "5vh",
                      color: "black",
                      width: "44vw",
                    }}
                  >
                    Message
                  </Button>

                  <Box pl={0.7} pt={0.5}>
                    <PersonAddIcon />
                  </Box>
                </Stack>
              </Grid>

              {posts.hasOwnProperty("successUserPosts") && (
                <Grid item>
                  <Gallery posts={posts} ping={"user"} />
                </Grid>
              )}
            </Grid>

            <Footer />
          </Grid>
        </Stack>
      )}
    </Box>
  );
}

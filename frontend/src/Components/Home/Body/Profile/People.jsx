import React, { useEffect } from "react";
import { Stack, Box, Avatar, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddFollower,
  asyncGetAdmin,
} from "../../../../Redux/actions/adminActions";
import { asyncUnfollow } from "../../../../Redux/actions/userActions";

export default function People(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.adminReducer);

  let checkFollowing =
    admin.hasOwnProperty("successUser") &&
    admin.successUser.following.find((item) => {
      return item.id == user._id;
    });

  const handleFollower = () => {
    const formData = {
      following: user.name,
      followingId: user._id,
      followingImage: user.image,
    };
    dispatch(asyncAddFollower(formData));
    setTimeout(() => {
      dispatch(asyncGetAdmin());
    }, 1500);
  };

  const handleUnfollow = () => {
    dispatch(asyncUnfollow(user._id));
    setTimeout(() => {
      dispatch(asyncGetAdmin());
    }, 1500);
  };

  useEffect(() => {
    dispatch(asyncGetAdmin());
  }, []);

  return (
    <Stack
      // bgcolor="white"
      width={{ xs: "50vw", md: "20vw" }}
      minHeight={{ xs: "23vh", md: "26", lg: "30vh" }}
      sx={{
        position: "relative",
        borderRadius: 1,
        boxShadow: 1,
        height: "23vh",
        // width: "50vw",
      }}
    >
      <Box
        // display={{ sm: "none" }}
        sx={{ position: "absolute", top: 0.5, right: 1 }}
      >
        <CloseIcon sx={{ color: "gray" }} />
      </Box>

      <Stack pt={1} spacing={2} sx={{ width: "100%" }} alignItems="center">
        <Link to={`/User/${user._id}`}>
          <Avatar sx={{ height: "80px", width: "80px" }} src={user.image} />
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/User/${user._id}`}
        >
          <Typography>{user.name}</Typography>
        </Link>

        {checkFollowing ? (
          <Stack justifyContent="center" pr={1} pl={1}>
            <Button
              onClick={handleUnfollow}
              sx={{
                bgcolor: "#efefef",
                height: "4vh",
                color: "black",
                // width: "33vw",
              }}
            >
              unfollow
            </Button>
          </Stack>
        ) : (
          <Stack justifyContent="center" pr={1} pl={1}>
            <Button
              onClick={handleFollower}
              variant="contained"
              bgcolor="#0095f6"
              sx={{
                height: "4vh",
                color: "white",
                // width: "33vw",
              }}
            >
              Follow
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

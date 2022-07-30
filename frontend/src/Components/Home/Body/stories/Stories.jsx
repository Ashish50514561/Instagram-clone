import React, { useEffect } from "react";
import { asyncGetStories } from "../../../../Redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncGetAdmin } from "../../../../Redux/actions/adminActions";
import {
  Grid,
  Stack,
  Box,
  IconButton,
  Avatar,
  Typography,
  Badge,
} from "@mui/material";

export default function Stories() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer);
  const admin = useSelector((state) => state.adminReducer);

  console.log({ users });

  const style = {
    transform: "scale(1.5)",
  };

  const handleClick = (e) => {
    e.target.style = style;
  };

  useEffect(() => {
    dispatch(asyncGetStories());
    dispatch(asyncGetAdmin());
  }, []);

  return (
    <Grid item>
      <Stack
        pl={1}
        pt={0.5}
        // pb={1}
        bgcolor="white"
        spacing={2}
        sx={{
          maxWidth: "100vw",
          overflow: "auto",
        }}
        direction="row"
      >
        <Link
          to="/postStory"
          style={{ textDecoration: "none", color: "black" }}
        >
          <Box>
            <Box bgcolor="white" p={0.5} borderRadius="50%">
              <Badge
                badgeContent="+"
                color="primary"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <Avatar
                  sx={{ height: 65, width: 65 }}
                  src={
                    admin.hasOwnProperty("successUser") &&
                    admin.successUser.image
                  }
                />
              </Badge>
            </Box>

            <Typography sx={{ fontSize: "13px" }} pl={1}>
              My story
            </Typography>
          </Box>
        </Link>

        {users.hasOwnProperty("storySuccess") &&
          users.storySuccess.map((user) => {
            return (
              <React.Fragment>
                {users.storySuccess.length != 0 ? (
                  <Box>
                    <Link to={`/story/${user._id}`}>
                      <Box
                        onClick={handleClick}
                        className="storiesBorder"
                        p={0.25}
                        sx={{
                          borderRadius: "50%",
                        }}
                      >
                        <Box bgcolor="white" p={0.5} borderRadius="50%">
                          <Avatar
                            sx={{ height: 60, width: 60 }}
                            src={user.stories[0]}
                          />
                        </Box>
                      </Box>
                    </Link>

                    <Typography sx={{ fontSize: "13px" }} pl={1.5}>
                      {user.userName.slice(0, 6) + ".."}
                    </Typography>
                  </Box>
                ) : null}
              </React.Fragment>
            );
          })}
      </Stack>
    </Grid>
  );
}

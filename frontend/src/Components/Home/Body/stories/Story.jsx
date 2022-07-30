import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetStory } from "../../../../Redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

import {
  Input,
  Grid,
  Stack,
  Box,
  Avatar,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";

export default function Story() {
  const { id } = useParams();
  const [i, setI] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer);
  const admin = useSelector((state) => state.adminReducer);

  const story = user.hasOwnProperty("soloSuccess")
    ? +100 / user.soloSuccess.stories.length
    : 1;
  console.log({ user });

  const prevStory = () => {
    if (i > 0) {
      setI(i - 1);
    }
  };

  const nextStory = () => {
    if (
      user.hasOwnProperty("soloSuccess") &&
      i < user.soloSuccess.stories.length - 1
    ) {
      setI(i + 1);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(asyncGetStory(id));
  }, []);

  // useEffect(() => {
  //   // user.hasOwnProperty("success") &&
  //   const intervalId = setInterval(() => {
  //     //   if (i === user.success.stories.length) {
  //     //     clearTimeout();
  //     //   } else {
  //     setI(i + 1);
  //     console.log(i);

  //     console.log("helooohi");
  //     return () => clearInterval(intervalId);
  //     // }
  //   }, 2000);
  // }, [i]);

  return (
    <React.Fragment>
      {user.hasOwnProperty("soloSuccess") && (
        <Stack alignItems="center">
          <Grid
            mt={{ md: 4 }}
            sm={9}
            md={7}
            lg={6}
            bgcolor="black"
            sx={{ position: "fixed", maxHeight: "100vh" }}
            container
          >
            <Stack
              aria-label="stry-buttons"
              direction="row"
              sx={{ height: "77vh", mt: 7, width: "100vw" }}
              className="changeStory"
            >
              <Box
                onClick={prevStory}
                className="changeStoryButtons"
                sx={{ height: "77vh", width: "50%" }}
              ></Box>
              <Box
                className="changeStoryButtons"
                onClick={nextStory}
                sx={{ height: "77vh", width: "50%" }}
              ></Box>
            </Stack>

            <Grid
              display={{ sm: "none" }}
              aria-label="story-lines"
              xs={12}
              item
            >
              <Stack
                sx={{ position: "absolute", width: "100vw" }}
                p={0.3}
                pt={1}
                spacing={0.4}
                direction="row"
              >
                {user.soloSuccess.stories.map((item) => {
                  return (
                    <Box
                      borderRadius="14%"
                      // bgcolor="#f5f5f5"
                      bgcolor=" 	 	#D8D8D8"
                      sx={{ height: "0.3vh", width: `${story}vw` }}
                      item
                    ></Box>
                  );
                })}
              </Stack>
            </Grid>

            <Grid sx={{ position: "absolute" }} item xs={12}>
              <Stack
                sx={{ width: "100vw" }}
                mt={0.5}
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" justifyContent="space-between">
                  <IconButton>
                    <Avatar src={user.soloSuccess.userImage} />
                  </IconButton>
                  <Typography
                    sx={{ fontSize: "14px" }}
                    color="#dfe5ec"
                    pt={2.5}
                    pl={1}
                  >
                    {user.soloSuccess.userName}
                  </Typography>
                </Stack>

                <Stack justifyContent="center">
                  <MoreVertIcon sx={{ color: "white" }} />
                </Stack>
              </Stack>
            </Grid>

            <Grid bgcolor="red" sx={{ height: "83.5vh" }}>
              <Box sx={{ height: "83.5vh" }}>
                <img src={user.soloSuccess.stories[i]} />
              </Box>
            </Grid>

            <Grid xs={12} item>
              <Stack direction="row" p={1} justifyContent="space-between">
                <Input
                  disableUnderline
                  type="text"
                  variant="standard"
                  style={{
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0)",
                    borderRadius: "2rem",
                    width: "90%",
                    border: "0.4px solid white",
                    paddingLeft: "1rem",
                  }}
                  placeholder="Send message"
                />

                <IconButton>
                  <TelegramIcon sx={{ color: "white", fontSize: 30 }} />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Sidebar />
        </Stack>
      )}
    </React.Fragment>
  );
}

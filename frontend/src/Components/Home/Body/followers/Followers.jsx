import React, { useEffect } from "react";
import { Stack, Typography, Grid, Box } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import Footer from "../../footer/Footer";
import Friend from "./Friend";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetUser } from "../../../../Redux/actions/userActions";

export default function Followers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, ping } = useParams();
  const user = useSelector((state) => state.userReducer);
  console.log("appreciate", ping);
  useEffect(() => {
    dispatch(asyncGetUser(id));
  }, []);

  return (
    <React.Fragment>
      {user.hasOwnProperty("successUser") && (
        <Stack alignItems="center" p={1} spacing={2}>
          <Stack
            width={{ sm: "60vw" }}
            sx={{ position: "fixed", top: 1 }}
            spacing={3}
            direction="row"
          >
            <KeyboardBackspaceIcon
              onClick={() => navigate(-1)}
              sx={{ fontSize: "30px" }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {user.successUser.name}
            </Typography>
          </Stack>

          <Stack
            pt={3.5}
            sx={{ borderBottom: "1px solid #FaFaFa" }}
            pl={1}
            pb={1}
          >
            followers - {user.successUser.followers.length}
          </Stack>

          <Grid
            sx={{
              minHeight: "70vh",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {user.successUser.followers.map((item) => {
              return <Friend item={item} ping={ping} />;
            })}
          </Grid>

          <Box display={{ sm: "none" }}>
            <Footer />
          </Box>
        </Stack>
      )}
    </React.Fragment>
  );
}

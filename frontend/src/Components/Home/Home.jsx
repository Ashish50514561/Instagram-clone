import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import Body from "./Body/Body";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Sidebar from "./Body/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // console.log({ token });
  // if (!token) {
  //   navigate("/login");
  // }

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <Stack
      direction="row"
      // bgcolor="red"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Grid sm={8} md={8} lg={6} container>
        <Header />
        <Body />
        <Footer />
      </Grid>
      <Box display={{ xs: "none" }}>
        <Footer />
      </Box>
      <Sidebar />
    </Stack>
  );
}

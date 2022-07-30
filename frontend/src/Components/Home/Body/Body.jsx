import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import Posts from "./Posts/Posts";
import Stories from "./stories/Stories";

export default function Body() {
  return (
    <Grid
      container
      item
      maxHeight={{ xs: "75vh", sm: "88vh" }}
      xs={12}
      sx={{
        maxWidth: "100vw",
        minHeight: "75vh",
        // maxHeight: "75vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Stories />

      <Box
        sx={{
          height: "1vh",
          width: "100vw",
          borderBottom: "0.3px solid #dbdbdb",
        }}
      ></Box>

      <Posts />
    </Grid>
  );
}

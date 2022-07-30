import { Avatar, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function User(props) {
  const { user } = props;

  return (
    <Box>
      <Link
        to={`/user/${user._id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ height: "50px", width: "50px" }} src={user.image} />
          <Typography>{user.name}</Typography>
        </Stack>
      </Link>
    </Box>
  );
}

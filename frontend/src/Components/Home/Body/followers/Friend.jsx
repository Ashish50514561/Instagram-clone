import React, { useState } from "react";
import { Avatar, Button, Stack, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  asyncRemoveFollower,
  asyncRemoveFollowing,
} from "../../../../Redux/actions/userActions";

export default function Friend(props) {
  const [remove, setRemove] = useState(false);
  const { item, ping } = props;
  const dispatch = useDispatch();
  console.log("bhai dhyaan de ", item);

  const handleRemove = () => {
    ping == "adminFollowers"
      ? dispatch(asyncRemoveFollower(item._id))
      : dispatch(asyncRemoveFollowing(item.id));
    setRemove(true);
  };

  return (
    <Stack
      spacing={{ md: 5 }}
      mb={2}
      width="100%"
      justifyContent="space-between"
      direction="row"
    >
      <Link
        to={`/user/${item.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Stack spacing={2} direction="row">
          <Avatar sx={{ height: "55px", width: "55px" }} src={item.image} />

          <Typography sx={{ pt: 1.5, fontWeight: 400 }}>{item.name}</Typography>
        </Stack>
      </Link>

      {(ping === "adminFollowers" || ping === "adminFollowing") && (
        <Box pr={0.5} pt={1}>
          <Button
            sx={{
              bgcolor: "#efefef",
              height: "5vh",
              color: "black",
              // width: "25vw",
            }}
            onClick={handleRemove}
          >
            {remove ? "Removed" : "Remove"}
          </Button>
        </Box>
      )}
    </Stack>
  );
}

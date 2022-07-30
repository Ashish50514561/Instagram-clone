import React from "react";
import { Grid, Stack, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function Comment(props) {
  const { comment } = props;
  console.log("hmnnmm", comment);

  return (
    <Stack mb={2.5} spacing={1} direction="row">
      <Box>
        <Box
          className="storiesBorder"
          p={0.25}
          sx={{
            borderRadius: "50%",
          }}
        >
          <Link to={`/user/${comment.userId}`}>
            <Box bgcolor="white" p={0.2} borderRadius="50%">
              <Avatar sx={{ height: 35, width: 35 }} src={comment.userImage} />
            </Box>
          </Link>
        </Box>
      </Box>

      <Stack spacing={1}>
        <Stack spacing={1} direction="row">
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            {comment.userName}_
          </Typography>
          <Typography pt={0.1} sx={{ fontSize: "15px", fontWeight: 100 }}>
            {comment.commentText}
          </Typography>
        </Stack>

        <Stack spacing={3} direction="row">
          <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
            1h
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
            Reply
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "text.secondary" }}>
            Send
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

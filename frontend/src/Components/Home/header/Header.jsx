import React, { useState, useEffect } from "react";
import { Box, Button, Grid, IconButton, Stack } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useDispatch } from "react-redux";
import { asyncMenu } from "../../../Redux/actions/menuAction";
import UploadMenu from "../Body/Menu/UploadMenu";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget);
    dispatch(asyncMenu(true));
  };

  useEffect(() => {
    return () => {
      dispatch(asyncMenu(false));
    };
  }, []);

  return (
    <Grid padding={1} item xs={12}>
      <Stack bgcolor="white" direction="row" justifyContent="space-between">
        <Box visibility={{ md: "hidden" }} className="instagram" p={0.7}>
          Instagram
        </Box>

        <Stack direction="row">
          <Box>
            <IconButton onClick={handleMenu}>
              <AddBoxOutlinedIcon
                sx={{ color: "text.primary", fontSize: 29 }}
              />
            </IconButton>
          </Box>
          <UploadMenu anchorEl={anchorEl} ping={"upload"} />

          <Box>
            <IconButton>
              <TelegramIcon sx={{ color: "text.primary", fontSize: 30 }} />
            </IconButton>
          </Box>
        </Stack>
      </Stack>
    </Grid>
  );
}

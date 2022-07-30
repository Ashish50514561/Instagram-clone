import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { asyncDrawer } from "../../../../Redux/actions/drawerActions";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import HistoryToggleOffOutlinedIcon from "@mui/icons-material/HistoryToggleOffOutlined";
import QrCodeScannerOutlinedIcon from "@mui/icons-material/QrCodeScannerOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";

export default function SettingDrawer() {
  const draw = useSelector((state) => state.drawerReducer);
  const dispatch = useDispatch();
  console.log("asssssssss", draw);

  const handleClose = () => {
    dispatch(asyncDrawer(false));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(asyncDrawer(false));
  };

  return (
    <Box>
      <Drawer
        PaperProps={{
          elevation: 0,
          style: { backgroundColor: "transparent" },
        }}
        // anchor="bottom"

        open={draw}
        onClose={handleClose}
      >
        <Box
          width={{ xs: "60vw", sm: "40vw", lg: "25vw" }}
          height={{ xs: "85vh", sm: "100vh" }}
          bgcolor="white"
          sx={
            {
              // width: "60vw",
              // height: "85vh",
            }
          }
        >
          <Stack>
            <Box>
              <List>
                <ListItem onClick={handleClose}>
                  <ListItemButton borderRadius={1}>
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <SettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography pt={0.6} variant="h6">
                        Settings
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>

                <ListItem onClick={handleClose}>
                  <ListItemButton borderRadius={1}>
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <HistoryOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography pt={0.6} variant="h6">
                        Archive
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>

                <ListItem onClick={handleClose}>
                  <ListItemButton borderRadius={1}>
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <HistoryToggleOffOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography pt={0.6} variant="h6">
                        Your activity
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>

                <ListItem onClick={handleClose}>
                  <ListItemButton borderRadius={1}>
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <QrCodeScannerOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography pt={0.6} variant="h6">
                        Qr code
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>

                <ListItem onClick={handleClose}>
                  <ListItemButton borderRadius={1}>
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <BookmarkBorderOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography pt={0.6} variant="h6">
                        Saved
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>

                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <ListItem onClick={handleLogout}>
                    <ListItemButton borderRadius={1}>
                      <ListItemIcon sx={{ minWidth: "45px" }}>
                        <LogoutOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography pt={0.6} variant="h6">
                          Logout
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}

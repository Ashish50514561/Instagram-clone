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
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";

export default function SettingDrawer() {
  return (
    <Box display={{ xs: "none", lg: "block" }} position="absolute" left={0}>
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
              <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                <ListItem>
                  <ListItemButton borderRadius={1}>
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography pt={0.6} variant="h6">
                        Home
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>

              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem>
                  <ListItemButton borderRadius={1}>
                    <ListItemIcon sx={{ minWidth: "45px" }}>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography pt={0.6} variant="h6">
                        Profile
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>

              <ListItem>
                <ListItemButton borderRadius={1}>
                  <ListItemIcon sx={{ minWidth: "45px" }}>
                    <BeenhereIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography pt={0.6} variant="h6">
                      Saved
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton borderRadius={1}>
                  <ListItemIcon sx={{ minWidth: "45px" }}>
                    <DocumentScannerIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography pt={0.6} variant="h6">
                      Qr code
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton borderRadius={1}>
                  <ListItemIcon sx={{ minWidth: "45px" }}>
                    <LocalActivityIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography pt={0.6} variant="h6">
                      Activity
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton borderRadius={1}>
                  <ListItemIcon sx={{ minWidth: "45px" }}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography pt={0.6} variant="h6">
                      Settings
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem>
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
    </Box>
  );
}

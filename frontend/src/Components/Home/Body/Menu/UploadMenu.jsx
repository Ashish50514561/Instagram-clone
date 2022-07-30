import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Box, Menu, MenuItem, Typography } from "@mui/material";
import { asyncMenu } from "../../../../Redux/actions/menuAction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { asyncDeletePost } from "../../../../Redux/actions/postActions";

export default function UploadMenu(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menu = useSelector((state) => state.menuReducer);
  const { anchorEl, ping, id } = props;

  const handleClose = () => {
    dispatch(asyncMenu(false));
  };

  const handleDeletePost = () => {
    dispatch(asyncDeletePost(id));
    navigate(-1);
  };

  return (
    <Box>
      <Menu
        PaperProps={{
          style: {
            width: 100,
          },
        }}
        sx={{ m: 1 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        MenuListProps={{
          "aria-labelledby": "notification-button",
        }}
        onClose={handleClose}
        open={menu}
        anchorEl={anchorEl}
        id="notification-menu"
      >
        {ping === "post" ? (
          <MenuItem onClick={handleDeletePost}>
            <Typography pl={1}>Remove </Typography>
          </MenuItem>
        ) : (
          <Box>
            <Link
              to="/postStory"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>
                <Typography pl={2}>Story</Typography>
              </MenuItem>
            </Link>

            <Link
              to="/addpost"
              style={{ textDecoration: "none", color: "black" }}
            >
              <MenuItem>
                <Typography pl={2}>Post</Typography>
              </MenuItem>
            </Link>

            <MenuItem>
              <Typography pl={2}>Reel</Typography>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
}

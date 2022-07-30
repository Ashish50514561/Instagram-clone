import React, { useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar";
import { Box, Grid, Stack, Button } from "@mui/material";
import Footer from "../../footer/Footer";
import Gallery from "../Profile/Gallery";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetPosts } from "../../../../Redux/actions/postActions";
import { asyncGetUsers } from "../../../../Redux/actions/userActions";
import User from "./User";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState(true);
  const [usersArray, setUsersArray] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const posts = useSelector((state) => state.postReducer);
  const users = useSelector((state) => state.userReducer);

  const filteredArray = usersArray.filter((user) => {
    return user.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleChange = (value) => {
    setGallery(false);
    value == "" && setGallery(true);
    setSearchValue(value);
  };

  useEffect(() => {
    dispatch(asyncGetPosts());
    dispatch(asyncGetUsers());
  }, []);

  useEffect(() => {
    users.hasOwnProperty("success") && setUsersArray(users.success);
  }, [users]);

  return (
    <Box>
      <Grid sx={{ p: 1, minHeight: "85vh", maxHeight: "85", overFlow: "auto" }}>
        <Box
          display={{ xs: "none", sm: "block" }}
          sx={{
            position: "fixed",
            right: 20,
          }}
        >
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </Box>
        <Stack
          sx={{
            bgcolor: "#efefef",

            width: { xs: 420, sm: 500, md: 800, lg: 1000 },
          }}
        >
          <SearchBar
            onChange={handleChange}
            style={{
              backgroundColor: "#efefef",
              height: 35,
              boxShadow: "none",
            }}
          />
        </Stack>

        {!gallery ? (
          <Stack spacing={2} mt={1.5}>
            {users.hasOwnProperty("success") &&
              filteredArray.map((user) => {
                return <User user={user} />;
              })}
          </Stack>
        ) : (
          <Stack mt={-3}>
            {posts.hasOwnProperty("success") && (
              <Gallery posts={posts} search={"search"} ping={"search"} />
            )}
          </Stack>
        )}
      </Grid>
      <Box display={{ sm: "none" }}>
        <Footer />
      </Box>
    </Box>
  );
}

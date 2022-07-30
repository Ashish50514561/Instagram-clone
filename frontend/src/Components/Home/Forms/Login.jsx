import React, { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { asyncLoginUser } from "../../../Redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const handleErrors = () => {
    if (loginStatus.hasOwnProperty("error")) {
      setError(loginStatus.error);
    }
    if (loginStatus.hasOwnProperty("successToken")) {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleLogin = () => {
    console.log("chl");
    const formData = {
      email: email,
      password: password,
    };
    dispatch(asyncLoginUser(formData));
  };

  useEffect(() => {
    handleErrors();
  }, [loginStatus]);

  return (
    <Stack alignItems="center">
      <Grid>
        <Stack spacing={0.5} pt={15} xs={12} sx={{ height: "65vh" }}>
          <Stack
            className="instagram"
            alignItems="center"
            justifyContent="center"
          >
            Instagram
          </Stack>

          <Stack aria-label="email" mt={2} p={2}>
            <TextField
              onChange={handleChange}
              name="email"
              placeholder="email or username "
              sx={{ borderRadius: 1, height: "49px", bgcolor: "#fafafa" }}
            />
          </Stack>

          <Stack aria-label="password" pl={2} pr={2}>
            <TextField
              onChange={handleChange}
              name="password"
              type={visible ? "text" : "password"}
              placeholder="password "
              sx={{ borderRadius: 1, height: "49px", bgcolor: "#fafafa" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleVisibility}>
                      {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack aria-label="login button" pl={2} pr={2} pt={2}>
            {error ? (
              <span
                style={{ color: "red", marginBottom: "6px", marginLeft: "5px" }}
              >
                {error}
              </span>
            ) : null}
            <Button
              onClick={handleLogin}
              sx={{ height: "50px" }}
              variant="contained"
            >
              Login
            </Button>
          </Stack>

          <Stack aria-label="get help login in" pl={4} pr={1} pt={1}>
            <Typography
              pl={2}
              sx={{
                fontSize: "13px",
                color: "text.secondary",
              }}
            >
              Forgot your login details?<b>Get help logging in</b>
            </Typography>
          </Stack>

          <Stack
            aria-label="fb login"
            pt={2}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography color="text.secondary">Or</Typography>
            <Typography color="primary.main" pt={1}>
              Login with Facebook
            </Typography>
          </Stack>

          <Stack
            aria-label="signup"
            pt={19}
            alignItems="center"
            justifyContent={"center"}
          >
            <Typography
              sx={{
                fontSize: "13px",
                color: "text.secondary",
              }}
            >
              Dont have an account?
              <b>
                <Link to="/signup">Sign up</Link>
              </b>
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  );
}

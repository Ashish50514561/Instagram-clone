import React, { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { asyncPostUser } from "../../../Redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  Grid,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  Input,
} from "@mui/material";

export default function Signup() {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  console.log({ user });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");

  const handleErrors = () => {
    if (user.hasOwnProperty("error")) {
      setError("error! try again");
    } else {
      setEmail("");
      setName("");
      setPassword("");
    }
  };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const initialValues = {
    email: "",
    name: "",
    password: "",
    image: "",
  };

  const handleSignup = async (values) => {
    let formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }

    for (const key of formData.entries()) {
      console.log(key[0], key[1]);
    }

    dispatch(asyncPostUser(formData));
    navigate("/login");
  };

  useEffect(() => {
    handleErrors();
  }, [user]);

  return (
    <Stack alignItems="center">
      <Grid>
        <Stack spacing={0.5} pt={2} xs={12} lg={6} sx={{ height: "65vh" }}>
          <Stack
            aria-label="heading"
            className="instagram"
            alignItems="center"
            justifyContent="center"
          >
            Instagram
          </Stack>

          <Stack pt={2} alignItems="center" justifyContent={"center"}>
            <Typography pl={4} pr={4} color="text.secondary">
              Sign up to see photos and videos
            </Typography>
            <Typography pl={6} pr={6} color="text.secondary">
              from your friends
            </Typography>
          </Stack>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <Stack pl={2} pr={2} pt={2}>
              <Button sx={{ height: "50px" }} variant="contained">
                Login with facebook
              </Button>
            </Stack>
          </Link>

          <Stack pt={2} alignItems="center" justifyContent={"center"}>
            <Typography color="text.secondary">Or</Typography>
          </Stack>

          <Formik
            // validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSignup}
          >
            {(formik) => {
              return (
                <Form>
                  <Stack aria-label="email" mt={2} pl={2} pr={2}>
                    <Field name="email">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <TextField
                            {...field}
                            placeholder="email or username "
                            sx={{
                              borderRadius: 1,
                              height: "49px",
                              bgcolor: "#fafafa",
                            }}
                          />
                        );
                      }}
                    </Field>
                  </Stack>

                  <Stack aria-label="name" p={2}>
                    <Field name="name">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <TextField
                            {...field}
                            placeholder="Fullname "
                            sx={{
                              borderRadius: 1,
                              height: "49px",
                              bgcolor: "#fafafa",
                            }}
                          />
                        );
                      }}
                    </Field>
                  </Stack>

                  <Stack pl={2} pr={2}>
                    <Field name="password">
                      {(props) => {
                        const { field, meta } = props;
                        return (
                          <TextField
                            {...field}
                            // value={password}
                            // onChange={handleChange}
                            // name="password"
                            type={visible ? "text" : "password"}
                            placeholder="password "
                            sx={{
                              borderRadius: 1,
                              height: "49px",
                              bgcolor: "#fafafa",
                            }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={handleVisibility}>
                                    {visible ? (
                                      <VisibilityOffIcon />
                                    ) : (
                                      <VisibilityIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        );
                      }}
                    </Field>
                  </Stack>

                  <Stack mt={2} pl={2} pr={2}>
                    <Field name="image">
                      {(props) => {
                        const { field, form, meta } = props;

                        return (
                          <TextField
                            placeholder="profile pic"
                            id="image"
                            onBlur={field.blur}
                            name={field.name}
                            onChange={(e) => {
                              form.setFieldValue(
                                "image",
                                e.currentTarget.files[0]
                              );
                            }}
                            type="file"
                            variant="standard"
                            sx={{ width: "75%" }}
                          />
                        );
                      }}
                    </Field>
                  </Stack>

                  <Stack aria-label="button signup" pl={2} pr={2} pt={2}>
                    {error ? (
                      <span
                        style={{
                          color: "red",
                          marginBottom: "6px",
                          marginLeft: "5px",
                        }}
                      >
                        {error}
                      </span>
                    ) : null}

                    <Button
                      // onClick={handleSignup}
                      type="submit"
                      sx={{ height: "50px" }}
                      variant="contained"
                    >
                      SignUp
                    </Button>
                  </Stack>
                </Form>
              );
            }}
          </Formik>

          <Stack p={4} pt={1}>
            <Typography
              sx={{
                fontSize: "13px",
                color: "text.secondary",
              }}
            >
              By signing up you agree to our policies and Terms
            </Typography>
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  );
}

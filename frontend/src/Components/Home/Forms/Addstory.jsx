import React, { useEffect, useState } from "react";
import { Grid, Stack, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { asyncPostStory } from "../../../Redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Addstory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const story = useSelector((state) => state.userReducer);

  console.log({ story });

  const initialValues = {
    image: "",
  };

  const handleErrors = () => {
    if (story.hasOwnProperty("uploadSuccess")) {
      navigate("/");
    } else if (story.hasOwnProperty("error")) {
      setError("error! plz try again");
    }
  };

  const onSubmit = (values) => {
    let formData = new FormData();
    for (const value in values) {
      formData.append(value, values[value]);
    }

    dispatch(asyncPostStory(formData));
    // navigate("/");
  };

  useEffect(() => {
    handleErrors();
  }, [story]);

  return (
    <Grid xs={12} sx={{ overflow: "none", bgcolor: "black" }}>
      <Stack
        pb={2}
        sx={{ height: "100vh" }}
        justifyContent="center"
        alignItems="center"
        bgcolor="black"
      >
        <Formik
          // validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Box bgcolor="white">
                  <Field name="image">
                    {(props) => {
                      const { field, form, meta } = props;

                      return (
                        <TextField
                          id="image"
                          // label={star("Image")}
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
                </Box>
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

                <Box mt={1}>
                  <Button
                    disabled={!formik.isValid}
                    type="submit"
                    variant="contained"
                  >
                    Upload
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Stack>
    </Grid>
  );
}

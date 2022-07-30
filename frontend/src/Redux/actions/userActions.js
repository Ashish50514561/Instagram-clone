import axios from "axios";

export const asyncPostUser = (formData) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:3001/signup", formData);
    res.data.hasOwnProperty("success")
      ? dispatch(Success(res.data))
      : dispatch(Fail(res.data));
  };
};

export const asyncLoginUser = (formData) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:3001/login", formData);
    if (res.data.hasOwnProperty("successToken")) {
      localStorage.setItem("token", res.data.successToken);
      dispatch(Success(res.data));
    } else {
      dispatch(Fail(res.data));
    }
  };
};

export const asyncPostStory = (formData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        "http://localhost:3001/story",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      response.data.hasOwnProperty("uploadSuccess")
        ? dispatch(Success(response.data))
        : dispatch(Fail(response.data));
    }
  };
};

export const asyncGetStories = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("http://localhost:3001/story", {
        headers: {
          Authorization: token,
        },
      });
      response.data.hasOwnProperty("storySuccess")
        ? dispatch(Success(response.data))
        : dispatch(Fail(response.data));
    }
  };
};

export const asyncGetStory = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`http://localhost:3001/getStory/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      response.data.hasOwnProperty("storySuccess")
        ? dispatch(Success(response.data))
        : dispatch(Fail(response.data));
    }
  };
};

export const asyncGetUsers = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get("http://localhost:3001/users", {
        headers: {
          Authoriztation: token,
        },
      });
      res.data.hasOwnProperty("success")
        ? dispatch(Success(res.data))
        : dispatch(Fail(res.data));
    }
  };
};

export const asyncGetUser = (id) => {
  console.log("le", id);
  return async (dispatch) => {
    const res = await axios.get(`http://localhost:3001/user/${id}`);
    res.data.hasOwnProperty("success")
      ? dispatch(Success(res.data))
      : dispatch(Fail(res.data));
  };
};

export const asyncRemoveFollower = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.delete(
        `http://localhost:3001/removeFollower/${id}`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
  };
};

export const asyncRemoveFollowing = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.delete(
        `http://localhost:3001/removeFollowing/${id}`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
  };
};

export const asyncUnfollow = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.delete(
        `http://localhost:3001/unfollow/${id}`,

        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
  };
};

export const asyncChangeProfile = (formData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        "http://localhost:3001/profile",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      response.data.hasOwnProperty("profileSuccess")
        ? dispatch(Success(response.data))
        : dispatch(Fail(response.data));
    }
  };
};

const Success = (response) => {
  return {
    type: "SUCCESS",
    payload: response,
  };
};

const Fail = (response) => {
  return {
    type: "Fail",
    payload: response,
  };
};

import axios from "axios";

export const asyncAddPost = (formData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        "http://localhost:3001/addPost",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      response.data.hasOwnProperty("success")
        ? dispatch(success(response.data))
        : dispatch(fail(response.data));
    }
  };
};

export const asyncDeletePost = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.delete(`http://localhost:3001/post/${id}`);
      res.data.hasOwnProperty("success")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

export const asyncGetPosts = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get("http://localhost:3001/posts");
      res.data.hasOwnProperty("success")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

export const asyncGetUserPosts = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get(`http://localhost:3001/userPosts/${id}`);
      res.data.hasOwnProperty("success")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

export const asyncGetPost = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get(`http://localhost:3001/viewPost/${id}`);
      res.data.hasOwnProperty("successViewPost")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

// export const asyncLike = (id) => {
//   return async (dispatch) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       const res = await axios.get(`http://localhost:3001/like/${id}`, {
//         headers: {
//           Authorization: token,
//         },
//       });
//       // res.data.hasOwnProperty("success")
//       //   ? dispatch(success(res.data))
//       //   : dispatch(fail(res.data));
//     }
//   };
// };

const success = (response) => {
  return {
    type: "POST_SUCCESS",
    payload: response,
  };
};

const fail = (response) => {
  return {
    type: "POST_FAIL",
    payload: response,
  };
};

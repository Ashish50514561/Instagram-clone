import axios from "axios";

export const asyncLike = (postId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.post(
        `http://localhost:3001/like/${postId}`,
        postId,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      response.data.hasOwnProperty("likeSuccess")
        ? dispatch(Success(response.data))
        : dispatch(Fail(response.data));
    }
  };
};

export const asyncGetLikes = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get(`http://localhost:3001/likes`);

      res.data.hasOwnProperty("likesSuccess")
        ? dispatch(Success(res.data))
        : dispatch(Fail(res.data));
    }
  };
};

export const asyncDeleteLike = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.delete(`http://localhost:3001/like/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      // res.data.hasOwnProperty("likesSuccess")
      //   ? dispatch(Success(res.data))
      //   : dispatch(Fail(res.data));
    }
  };
};

const Success = (response) => {
  return {
    type: "LIKE_SUCCESS",
    payload: response,
  };
};

const Fail = (response) => {
  return {
    type: "LIKE_FAIL",
    payload: response,
  };
};

import axios from "axios";

export const asyncPostComment = (formData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const res = await axios.post(
        "http://localhost:3001/postComment",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      res.data.hasOwnProperty("postSuccess")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

export const asyncGetComments = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const res = await axios.get(`http://localhost:3001/comments/${id}`);
      res.data.hasOwnProperty("Success")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

export const asyncGetAllComments = (id) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      const res = await axios.get(`http://localhost:3001/allComments/`, {
        headers: {
          Authorization: token,
        },
      });
      res.data.hasOwnProperty("CommentsSuccess")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

const success = (res) => {
  return {
    type: "COMMENT_SUCCESS",
    payload: res,
  };
};

const fail = (res) => {
  return {
    type: "COMMENT_FAIL",
    payload: res,
  };
};

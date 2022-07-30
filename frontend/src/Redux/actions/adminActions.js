import axios from "axios";

export const asyncGetAdmin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.get(`http://localhost:3001/admin`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("boomm yr", res.data);
      res.data.hasOwnProperty("successUser")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

export const asyncAddFollower = (formData) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await axios.post(
        `http://localhost:3001/addFollower`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      res.data.hasOwnProperty("success")
        ? dispatch(success(res.data))
        : dispatch(fail(res.data));
    }
  };
};

const success = (response) => {
  return {
    type: "ADMIN_SUCCESS",
    payload: response,
  };
};
const fail = (response) => {
  return {
    type: "ADMIN_FAIL",
    payload: response,
  };
};

import axios from "axios";
import { AUTH_USER, LOGOUT_USER, REGISTER_USER } from "./types";

// user Login function

export const getAuthUser = (FormData) => async (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/user/auth", FormData, config);
    dispatch({
      type: AUTH_USER,
      payload: res.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(getState().auth.userInfo));
  } catch (error) {}
};

// user Logout function

export const logout = () =>  (dispatch) => {
       localStorage.removeItem('userInfo')
       dispatch({
         type: LOGOUT_USER
       })
}

// user Register function

export const registerUser = (formData) => async (dispatch, getState) =>  {
     const config = {
          headers: {
             "Content-Type": "application/json"
          }
     }

     try {
        const res = await axios.post("/api/user", formData, config)
        dispatch({
          type: REGISTER_USER,
          payload: res.data
        })
        localStorage.setItem("userInfo", JSON.stringify(getState().auth.userInfo))
     } catch (error) {
       
     }
}
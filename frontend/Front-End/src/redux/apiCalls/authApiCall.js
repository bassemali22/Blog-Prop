import { authAction } from "../slices/authSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

export function loginUser(user) {
  return async (dispatch) => {
    try {
      // const response = await fetch("http://localhost:5000/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify(user),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const data = await response.json();

      const { data } = await request.post("/api/auth/login", user);
      dispatch(authAction.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };
}

export function LogoustUser() {
  return (dispatch) => {
    dispatch(authAction.logout());
    localStorage.removeItem("userInfo");
  };
}

export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authAction.register(data));
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };
}

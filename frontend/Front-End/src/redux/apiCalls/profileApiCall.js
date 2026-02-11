import { profileAction } from "../slices/profileSlice";
import { authAction } from "../slices/authSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileAction.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };
}

export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    console.log(getState().auth.user.token);
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,

        {
          headers: {
            authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-date",
          },
        }
      );
      dispatch(profileAction.setProfile(data.profilePhoto));
      dispatch(authAction.setUserPhoto(data.profilePhoto));
      toast.success(data.message);

      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };
}

export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileAction.setLodaing());
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileAction.updateProfile(data));
      dispatch(authAction.setUsername(data));

      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };
}

export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileAction.setLodaing());

      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileAction.setIsProfileDeleted());
      toast.success(data?.message);
      setTimeout(() => {
        dispatch(profileAction.clearIsProfileDeleted());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.mesage);
      dispatch(profileAction.clearLodaing());
    }
  };
}

export function getUserCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileAction.setUserCount(data));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };
}

export function getAllUserProfile() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileAction.setProfiles(data));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response.data.mesage);
    }
  };
}

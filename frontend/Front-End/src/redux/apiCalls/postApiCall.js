import { toast } from "react-toastify";
import request from "../../utils/request";
import { postAction } from "../slices/postSlice";
// import { data } from "react-router-dom";
export function fetchPost(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `/api/posts?pageNumber=${pageNumber} `
      );
      dispatch(postAction.setPosts(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(postAction.setPostsCount(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function fetchPostBasedOnCatogery(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category} `);
      dispatch(postAction.setPostsCate(data));
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function creatPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postAction.setLoading());
      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(postAction.setIsPostCreated());
      setTimeout(() => dispatch(postAction.clearIsPostCreated), [2000]);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(postAction.clearLoading);
    }
  };
}

export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(postAction.setPost(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function toggleLikePost(postId) {
  return async (dispatch, getStates) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getStates().auth.user.token,
          },
        }
      );
      dispatch(postAction.setLikes(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function updatePostImage(newImage, postId) {
  return async (dispatch, getStates) => {
    try {
      await request.put(`/api/posts/update-image/${postId}`, newImage, {
        headers: {
          Authorization: "Bearer " + getStates().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("New Post Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function updatePost(newPost, postId) {
  return async (dispatch, getStates) => {
    try {
      const { data } = await request.put(`/api/posts${postId}`, newPost, {
        headers: {
          Authorization: "Bearer " + getStates().auth.user.token,
        },
      });
      dispatch(postAction.setPost(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function deletePost(newPost, postId) {
  return async (dispatch, getStates) => {
    try {
      const { data } = await request.delete(`/api/posts${postId}`, {
        headers: {
          Authorization: "Bearer " + getStates().auth.user.token,
        },
      });
      dispatch(postAction.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function getAllPost() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      dispatch(postAction.setPosts(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

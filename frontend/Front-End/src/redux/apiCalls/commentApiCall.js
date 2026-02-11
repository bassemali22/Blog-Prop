import { toast } from "react-toastify";
import request from "../../utils/request";
import { postAction } from "../slices/postSlice";
import { commentAction } from "../slices/commentSlice";

export function createComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/comments`, newComment, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postAction.addCommentToPost(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function updateComment(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        comment,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postAction.updateCommentPost(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentAction.deleteComment(commentId));
      dispatch(postAction.deleteCommentFromPost(commentId));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function fetchAllComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentAction.setComment(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

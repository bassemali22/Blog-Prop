import { toast } from "react-toastify";
import request from "../../utils/request";
import { categoryAction } from "../slices/categorySlice";

export function fetchAllCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/categories`);
      dispatch(categoryAction.setCategories(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function createCategories(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/categories`, newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryAction.addCategories(data));
      toast.success("category  created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function deleteCategories(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryAction.deleteCategories(data.categoryId));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

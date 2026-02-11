import { createSlice } from "@reduxjs/toolkit";
//:localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo"))

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postCount: null,
    postCate: [],
    loading: false,
    isPostCreated: false,
    post: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPostsCount(state, action) {
      state.postCount = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    clearIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    setPost(state, action) {
      state.post = action.payload;
    },
    setLikes(state, action) {
      state.post.likes = action.payload.likes;
    },
    deletePost(state, action) {
      state.posts = state.post.filter((p) => p._id !== action.payload);
    },
    addCommentToPost(state, action) {
      state.post.comments.push(action.payload);
    },
    updateCommentPost(state, action) {
      state.post.comments = state.post.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    deleteCommentFromPost(state, action) {
      const comment = state.post.comments.find((c) => c._id === action.payload);
      const indexComment = state.post.comments.indexOf(comment);
      state.post.comments.Splice(indexComment, 1);
    },
  },
});

const postReducer = postSlice.reducer;
const postAction = postSlice.actions;

export { postAction, postReducer };

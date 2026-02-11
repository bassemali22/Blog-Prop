import { createSlice } from "@reduxjs/toolkit";
//:localStorage.getItem("userInfo")? JSON.parse(localStorage.getItem("userInfo"))

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    lodaing: false,
    isProfileDeleted: false,
    userCount: null,
    profiles: [],
  },
  reducers: {
    setProfile(state, actions) {
      state.profile = actions.payload;
    },
    setProfilephoto(state, actions) {
      state.profile.profilephoto = actions.payload;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
    updateProfilephoto(state, actions) {
      state.profile = actions.payload;
    },
    clearLodaing(state) {
      state.lodaing = false;
    },
    setLodaing(state) {
      state.lodaing = true;
    },
    setIsProfileDeleted(state) {
      state.isProfileDeleted = true;
      state.lodaing = false;
    },
    clearIsProfileDeleted(state) {
      state.isProfileDeleted = false;
    },
    setUserCount(state, action) {
      state.userCount = action.payload;
    },
    setProfiles(state, action) {
      state.profiles = action.payload;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileAction = profileSlice.actions;

export { profileAction, profileReducer };

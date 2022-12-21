import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: {},
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    userData: (state, action) => {
      const user = {
        email: action.payload.data.email,
        firstname: action.payload.data.first_name,
        secondname: action.payload.data.second_name,
        isLoggedIn: true,
      };
      return {
        ...state,
        user,
      };
    },
    logOut: (state) => {
      const user = {
        user: {},
        isLoggedIn: false,
      };
      return {
        ...state,
        user,
      };
    },
    setToken: (state, action) => {
      const token = {
        access_token: action.payload.data.token.access,
        refresh_token: action.payload.data.token.refresh,
      };
      return {
        ...state,
        token,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, userData, setToken } = userSlice.actions;

export default userSlice.reducer;

/* eslint-disable operator-linebreak */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: {},
  userDetails: {},
  modelStatus: {},
  freelancer_id: {},
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    userData: (state, action) => {
      console.log(action, 'reducer action');
      const user = {
        id: action.payload.id,

        isLoggedIn: true,
      };
      return {
        ...state,
        user,
      };
    },
    userDetails: (state, action) => {
      console.log(action, 'reducer action');
      const userDetails = action.payload;

      return {
        ...state,
        userDetails,
      };
    },

    logOut: (state) => {
      const user = {
        id: null,

        isLoggedIn: false,
      };
      const userDetails = {};
      const token = {};
      return {
        ...state,
        user,
        userDetails,
        token,
      };
    },
    setFreelancer: (state, action) => {
      console.log(action.payload, 'this is reducer');
      const freelancer_id = action.payload;
      return {
        ...state,
        freelancer_id,
      };
    },
    setToken: (state, action) => {
      console.log('token acess', action.payload);
      console.log('refresh acess', action.payload.token.refresh);
      const token = {
        access_token: action.payload.token.access,
        refresh_token: action.payload.token.refresh,
      };
      return {
        ...state,
        token,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { logOut, userDetails, userData, setToken, setFreelancer } =
  userSlice.actions;

export default userSlice.reducer;

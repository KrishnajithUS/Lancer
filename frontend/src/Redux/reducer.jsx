/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { createSlice } from '@reduxjs/toolkit';
import { AiOutlineConsoleSql } from 'react-icons/ai';

const initialState = {
  user: {},
  token: {},
  userDetails: {},
  modalStatus: { status: false },
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    userData: (state, action) => {
      console.log(action, 'reducer action');
      const user = {
        id: action.payload.id,
        is_freelancer: action.payload.is_freelancer,
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
    modalStatus: (state, action) => {
      const modalStatus = {
        status: action.payload,
      };
      return { ...state, modalStatus };
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
      console.log('token acess', action.payload.token.access);
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
export const { logOut, userDetails, userData, setToken, modalStatus } =
  userSlice.actions;

export default userSlice.reducer;

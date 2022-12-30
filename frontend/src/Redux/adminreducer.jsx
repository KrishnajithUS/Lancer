/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { createSlice } from '@reduxjs/toolkit';
import { userSlice } from './reducer';

const initialState = {
  admin: {},
};
export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminData: (state, action) => {
      console.log(action);
      console.log('heeei', action.payload.id);
      const admin = {
        id: action.payload.id,
        access_token: action.payload.token.access,
        refresh_token: action.payload.token.refresh,
        isLoggedIn: true,
      };
      return {
        ...state,
        admin,
      };
    },
    adminLogOut: (state, action) => {
      const admin = {
        id: null,
        isLoggedIn: false,
      };
      return {
        ...state,
        admin,
      };
    },
  },
});
export const { adminData, adminLogOut } = adminSlice.actions;
export default adminSlice.reducer;

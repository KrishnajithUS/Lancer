import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: {},
  initialdata: 'usermanagement',
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
    adminUpdate: (state, action) => {
      console.log('access in red', action.payload.token.access);
      console.log('access in red', action.payload.token.refresh);
      // creating a new state objects with all the existing property
      // creating an admin object with all the properties of admin object
      // and then update specific values
      return {
        ...state,
        admin: {
          ...state.admin,
          access_token: action.payload.token.access,
          refresh_token: action.payload.token.refresh,
        },
      };
    },
    adminLogOut: (state) => {
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
export const { adminData, adminUpdate, adminLogOut } = adminSlice.actions;
export default adminSlice.reducer;

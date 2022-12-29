/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Freelancer: {},
  FreelancerDetails: {},
  token: null,
  modalStatus: {},
};

const FreelancerSlice = createSlice({
  name: 'freelancer',
  initialState,
  reducers: {
    FData: (state, action) => {
      console.log(action, 'reducer action');
      const Freelancer = {
        id: action.payload.id,

        isLoggedIn: true,
      };
      return {
        ...state,
        Freelancer,
      };
    },
    FDetails: (state, action) => {
      console.log(action, 'reducer action');
      const FreelancerDetails = action.payload;

      return {
        ...state,
        FreelancerDetails,
      };
    },
    modalStatus: (state, action) => {
      const modelStatus = action.payload;
      return { ...state, modelStatus };
    },
    FlogOut: (state) => {
      const Freelancer = {
        id: null,

        isLoggedIn: false,
      };
      const FreelancerDetails = {};
      const token = {};
      return {
        ...state,
        Freelancer,
        FreelancerDetails,
        token,
      };
    },
    FsetToken: (state, action) => {
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
export const {
 logOut, FDetails, FData, FsetToken, modalStatus
} =
  FreelancerSlice.actions;
export default FreelancerSlice.reducer;

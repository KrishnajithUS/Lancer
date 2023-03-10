/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  Freelancer: {},
  FreelancerDetails: {},
  token: null,
  modalStatus: 'hidemodal',
  modalStatusN: 'hidemodal',
  setRefreshInProgress: false,
  skills: {},
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
    modalStatusN: (state, action) => {
      const modelStatusN = action.payload;
      return { ...state, modelStatusN };
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
    Fskills: (state, action) => {
      const skills = action.payload;
      return { ...state, skills };
    },
    setRefreshInProgress: (state, action) => {
      const setRefreshInProgress = action.payload;
      console.log('setResfreshtoken', setRefreshInProgress);
      return { ...state, setRefreshInProgress };
    },
    FsetToken: (state, action) => {
      console.log('token acess in reducer', action.payload.token.access);
      console.log('refresh acess in reducer', action.payload.token.refresh);
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
  FlogOut,
  FDetails,
  Fskills,
  FData,
  FsetToken,
  modalStatus,
  modalStatusN,
  setRefreshInProgress,
} = FreelancerSlice.actions;
export default FreelancerSlice.reducer;

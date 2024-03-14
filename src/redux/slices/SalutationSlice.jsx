// import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  timezoneutcoffset: new Date().getTimezoneOffset()
};
const initialState = {
  salutationsList: []
};

const slice = createSlice({
  name: "salutations",
  initialState,
  reducers: {
    getSalutations(state, action) {
      state.salutationsList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getSalutationsList() {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/salutations`, { headers });
      dispatch(slice.actions.getSalutations(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function createSalutation(data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/salutations`, data, {
        headers
      });
      dispatch(getUsersList());
      if (handleApiRes) {
        handleApiRes(response.data);
      }
    } catch (error) {
      console.log(error);
      if (handleApiRes) {
        handleApiRes(error.response.data.message);
      }
    }
  };
}

export function updateSalutation(id, data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_HOST_API_KEY}v1/salutations?id=${id}`, data, {
        headers
      });
      dispatch(getUsersList());
      if (handleApiRes) {
        handleApiRes(response.data);
      }
    } catch (error) {
      console.log(error);
      if (handleApiRes) {
        handleApiRes(error.response.data);
      }
    }
  };
}

export function deleteSalutation(id, handleApiRes) {
  return async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_HOST_API_KEY}v1/salutations?id=${id}`, { headers });
      handleApiRes(response.data);
      console.log("response", response);
      console.log("response data", response.data);
      dispatch(getUsersList());
    } catch (error) {
      handleApiRes(error.response.data.message);
      console.log(error);
    }
  };
}

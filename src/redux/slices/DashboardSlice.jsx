// import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  timezoneutcoffset: new Date().getTimezoneOffset()
};
const initialState = {
  attendanceStats: {}
};

const slice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getStats(state, action) {
      state.attendanceStats = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getAllStatsList(setStatsLoading) {
  setStatsLoading(true);
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/dashboard/stats`, { headers });
      dispatch(slice.actions.getStats(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setStatsLoading(false);
    }
  };
}

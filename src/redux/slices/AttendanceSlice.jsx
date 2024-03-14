// import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  timezoneutcoffset: new Date().getTimezoneOffset()
};
const initialState = {
  attendanceRoaster: {},
  monthlyAttendanceRoaster: [],
  attendanceList: [],
  currentTime: new Date()
};

const slice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    getRoaster(state, action) {
      state.attendanceRoaster = action.payload.data;
    },
    getMonthlyRoaster(state, action) {
      state.monthlyAttendanceRoaster = action.payload.data;
    },
    getAttendance(state, action) {
      state.attendanceList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getAllAttendanceList(setLoading) {
  setLoading(true);
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/attendances`, { headers });
      dispatch(slice.actions.getAttendance(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
}

export function getAttendancesRoaster() {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/attendances/roaster`, { headers });
      dispatch(slice.actions.getRoaster(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMonthlyRoasterList(setLoading, startDate, endDate) {
  let endPointToBe;
  if (startDate && endDate) {
    endPointToBe = `${import.meta.env.VITE_HOST_API_KEY}v1/attendances/monthly-roasters?startDate=${startDate}&endDate=${endDate}`;
  } else {
    endPointToBe = `${import.meta.env.VITE_HOST_API_KEY}v1/attendances/monthly-roasters`;
  }

  setLoading(true);
  return async () => {
    try {
      const response = await axios.get(endPointToBe, { headers });
      dispatch(slice.actions.getMonthlyRoaster(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
}

export function attendancesCheckIn(finalData) {
  return async () => {
    try {
      await axios.patch(`v1/attendances/check-in`, finalData, {
        headers
      });
      dispatch(getAttendancesRoaster());
    } catch (error) {
      console.log(error);
    }
  };
}

export function attendancesCheckOut(finalData, apiResponse) {
  return async () => {
    try {
      const response = await axios.patch(`v1/attendances/check-out`, finalData, {
        headers
      });
      dispatch(getAttendancesRoaster());
      apiResponse(response);
    } catch (error) {
      console.log(error);
    }
  };
}

import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};
const initialState = {
  isLoading: false,
  leaveTypesList: []
};

const slice = createSlice({
  name: "leaveType",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },

    getLeaveTypes(state, action) {
      state.leaveTypesList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function createLeaveType(data, handleApiRes) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-types`, data, {
        headers
      });
      handleApiRes(response.data.message);
      dispatch(getAllLeavesTypeList());
      dispatch(slice.actions.endLoading());
    } catch (error) {
      dispatch(slice.actions.endLoading());
      console.log(error);
    }
  };
}
export function updateLeaveType(id, data, handleApiRes) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.patch(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-types/${id}`, data, {
        headers
      });
      handleApiRes(response.data.message);
      dispatch(getAllLeavesTypeList());
      dispatch(slice.actions.endLoading());
    } catch (error) {
      dispatch(slice.actions.endLoading());
      console.log(error);
    }
  };
}

export function getAllLeavesTypeList() {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-types`, { headers });
      dispatch(slice.actions.getLeaveTypes(response.data));
      dispatch(slice.actions.endLoading());
    } catch (error) {
      console.log(error);
    }
  };
}
export function deleteLeaveType(id, handleApiRes) {
  return async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-types/${id}`, { headers });
      handleApiRes(response.data.message);
      dispatch(getAllLeavesTypeList());
    } catch (error) {
      console.log(error);
      handleApiRes();
    }
  };
}

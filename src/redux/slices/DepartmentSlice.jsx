import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};
const initialState = {
  departmentList: []
};

const slice = createSlice({
  name: "department",
  initialState,
  reducers: {
    getDepartments(state, action) {
      state.departmentList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getDepartmentList() {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/departments`, { headers });
      dispatch(slice.actions.getDepartments(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

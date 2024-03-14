import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};
const initialState = {
  timeslotsList: []
};

const slice = createSlice({
  name: "timeslot",
  initialState,
  reducers: {
    getTimeslots(state, action) {
      state.timeslotsList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getTimeslotsList() {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/time-slots`, { headers });
      dispatch(slice.actions.getTimeslots(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

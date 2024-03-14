import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};
const initialState = {
  designationList: []
};

const slice = createSlice({
  name: "designation",
  initialState,
  reducers: {
    getDesigantions(state, action) {
      state.designationList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getDesignationList() {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/designations`, { headers });
      dispatch(slice.actions.getDesigantions(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

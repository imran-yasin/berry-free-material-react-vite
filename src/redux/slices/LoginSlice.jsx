import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const initialState = {
  loggedInUsersPermission: []
};
const slice = createSlice({
  name: "login",
  initialState,
  reducers: {
    getLoggedInUsersPermission(state, action) {
      state.loggedInUsersPermission = action.payload.data;
    }
  }
});
export default slice.reducer;
export function loginUser(data, handleLoginFormData) {
  return async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/auth/login`, data);
      const permissionsResponse = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/permissions/permissions-for-loggedin-user`, {
        headers: {
          Authorization: `Bearer ${response?.data?.data?.token}`
          // timezoneutcoffset: new Date().getTimezoneOffset(),
        }
      });
      dispatch(slice.actions.getLoggedInUsersPermission(response.data.data));
      localStorage.setItem("permissions", permissionsResponse.data.data);
      if (handleLoginFormData) {
        handleLoginFormData(response?.data);
      }
    } catch (error) {
      console.log(error);
      handleLoginFormData();
    }
  };
}

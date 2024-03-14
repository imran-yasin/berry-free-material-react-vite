import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  timezoneutcoffset: new Date().getTimezoneOffset()
};

const slice = createSlice({
  name: "employee",
  initialState: {
    isLoading: false,
    employeeData: {}, // ** Employee data
    myProfileData: {}
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    // ** user from data action
    setEmployeeData(state, action) {
      state.employeeData = action.payload;
    },
    getMyProfile(state, action) {
      state.myProfileData = action.payload.data;
    }
  }
});

export default slice.reducer;

export function employeeCreateData(data) {
  return (dispatch) => {
    console.log("data", data);
    // Modified to accept dispatch as an argument
    dispatch(slice.actions.setEmployeeData(data));
  };
}

export function getMyProfileInfo() {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/users/get-my-profile-info`, { headers });
      dispatch(slice.actions.getMyProfile(response.data));
      dispatch(slice.actions.endLoading());
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateEmployeeInformation(data, handleSubmitProfileData) {
  console.log("data in the update emplyee", data);

  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.patch(`${import.meta.env.VITE_HOST_API_KEY}v1/users/employee?id=${data.id}`, data, {
        headers
      });
      handleSubmitProfileData(response.data.message);
      dispatch(getMyProfileInfo());
      dispatch(slice.actions.endLoading());
      console.log("response o update emplyeee ", response.data);
    } catch (error) {
      console.log(error);
    }
  };
}

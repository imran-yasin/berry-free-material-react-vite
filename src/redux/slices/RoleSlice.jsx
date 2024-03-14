import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};
const initialState = {
  rolesList: []
};

const slice = createSlice({
  name: "role",
  initialState,
  reducers: {
    getRoles(state, action) {
      state.rolesList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getRolesList(handleApiRes) {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/roles`, { headers });
      dispatch(slice.actions.getRoles(response.data));
      if (handleApiRes) {
        handleApiRes(response.data);
      }
    } catch (error) {
      console.log(error);
      // if (handleApiRes) {
      //   handleApiRes(error);
      // }
    }
  };
}

export function createRole(data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/roles`, data, {
        headers
      });
      console.log("repso: ", response);
      handleApiRes(response.data.message);
      dispatch(getRolesList());
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateRole(data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_HOST_API_KEY}v1/roles?id=${data.id}`, data, {
        headers
      });
      handleApiRes(response.data.message);
      dispatch(getRolesList());
    } catch (error) {
      // handleApiRes(error.response.data.message);
      console.log(error);
    }
  };
}

export function deleteRole(id, handleApiRes) {
  return async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_HOST_API_KEY}v1/roles?roleId=${id}`, { headers });
      console.log("response", response);
      handleApiRes(response.data.message);
      dispatch(getRolesList());
    } catch (error) {
      console.log(error);
      handleApiRes();

      // handleApiRes(error.response.data);
    }
  };
}

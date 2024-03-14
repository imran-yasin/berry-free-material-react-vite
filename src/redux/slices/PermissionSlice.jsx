import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};
const initialState = {
  permissionsList: [],
  rolesWithpermissionsList: []
};

const slice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    getPermissions(state, action) {
      state.permissionsList = action.payload.data;
    },
    getRolesWithPermissions(state, action) {
      state.rolesWithpermissionsList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getPermissionsList(handleApiRes) {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/permissions`, { headers });

      dispatch(slice.actions.getPermissions(response.data));
      if (handleApiRes) {
        handleApiRes(response.data);
      }
    } catch (error) {
      console.log("error", error);
      if (handleApiRes) {
        handleApiRes(error);
      }
    }
  };
}

export function getRolesWithPermissionsList(handleApiRes) {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/permissions/get-roles-with-permissions`, { headers });

      dispatch(slice.actions.getRolesWithPermissions(response.data));
      if (handleApiRes) {
        handleApiRes(response.data);
      }
    } catch (error) {
      console.log("error", error);
      if (handleApiRes) {
        handleApiRes(error);
      }
    }
  };
}

export function updateRolePermissions(data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST_API_KEY}v1/permissions/add-or-remove-role-permissions`,
        { data: data },
        { headers }
      );
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

// import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  timezoneutcoffset: new Date().getTimezoneOffset()
};
const initialState = {
  isLoading: false,
  usersList: [],
  userRolesWithpermissionsList: []
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    endLoading(state) {
      state.isLoading = false;
    },

    getUsers(state, action) {
      state.usersList = action.payload.data;
    },

    postUsers(state, action) {
      state.usersList = action.payload("");
    },

    getUserRolesWithPermissions(state, action) {
      state.userRolesWithpermissionsList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function getUsersList() {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/users`, { headers });

      dispatch(slice.actions.getUsers(response.data));
      dispatch(slice.actions.endLoading());
    } catch (error) {
      console.log(error);
    }
  };
}

export function createUser(data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/users`, data, {
        headers
      });
      if (handleApiRes) {
        handleApiRes(response.data.message);
      }
      dispatch(getUsersList());
    } catch (error) {
      console.log(error);
    }
  };
}

export function createEmployee(data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/users/employee`, data, {
        headers
      });
      if (handleApiRes) {
        handleApiRes(response.data.message);
      }
      dispatch(getUsersList());
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUser(data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_HOST_API_KEY}v1/users?id=${data.id}`, data, {
        headers
      });
      dispatch(getUsersList());
      if (handleApiRes) {
        handleApiRes(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUserStatus(id, status, handleUpdateStatusApiRes) {
  return async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST_API_KEY}v1/users/change-status?id=${id}&active=${status}`,
        {},
        { headers }
      );
      if (handleUpdateStatusApiRes) {
        handleUpdateStatusApiRes(response.data);
      }
      dispatch(getUsersList());
    } catch (error) {
      if (handleUpdateStatusApiRes) {
        handleUpdateStatusApiRes(error?.response?.data);
      }
    }
  };
}

export function postUsersList(data) {
  return async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/users`, data, {
        headers
      });
      response.status == 200 ? showToastMessage() : null;

      dispatch(getUsersList());
    } catch (error) {
      showToastErrMessage();
    }
  };
}

export function getUserRolesWithPermissionsList(handleApiRes) {
  return async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/roles/get-users-with-roles`, { headers });

      dispatch(slice.actions.getUserRolesWithPermissions(response.data));
      if (handleApiRes) {
        handleApiRes();
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateUserRolesPermissions(data, handleApiRes) {
  return async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_HOST_API_KEY}v1/roles/add-or-remove-user-roles`,
        { data: data },
        { headers }
      );
      if (handleApiRes) {
        handleApiRes(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(id, handleApiRes) {
  return async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_HOST_API_KEY}v1/users?id=${id}`, { headers });
      console.log("response", response);
      console.log("response data", response.data.message);
      handleApiRes(response.data.message);
      dispatch(getUsersList());
    } catch (error) {
      console.log(error);
      handleApiRes();
    }
  };
}

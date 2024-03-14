import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { dispatch } from "../Store";

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`
};
const initialState = {
  isLoading: false,
  isLoadingForMyLeavesList: false,
  isLoadingForAllLeavesList: false,
  isLoadingForAllLeavesRequestList: false,
  myLeavesRequestList: [],
  myLeavesList: [],
  allLeavesList: [],
  allLeavesRequestList: []
};

const slice = createSlice({
  name: "leaveRequest",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
    },
    startLoadingForMyLeavesList(state) {
      state.isLoadingForMyLeavesList = true;
    },
    endLoadingForMyLeavesList(state) {
      state.isLoadingForMyLeavesList = false;
    },
    startLoadingForAllLeavesList(state) {
      state.isLoadingForAllLeavesList = true;
    },
    endLoadingForAllLeavesList(state) {
      state.isLoadingForAllLeavesList = false;
    },
    startLoadingForAllLeavesRequestList(state) {
      state.isLoadingForAllLeavesRequestList = true;
    },
    endLoadingForAllLeavesRequestList(state) {
      state.isLoadingForAllLeavesRequestList = false;
    },
    getAllLeaves(state, action) {
      state.allLeavesList = action.payload.data;
    },
    getMyLeaves(state, action) {
      state.myLeavesList = action.payload.data;
    },
    getMyLeavesRequest(state, action) {
      state.myLeavesRequestList = action.payload.data;
    },
    getAllLeavesRequest(state, action) {
      state.allLeavesRequestList = action.payload.data;
    }
  }
});

export default slice.reducer;

export function createLeaveForEmployee(data, handleApiRes) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/leaves`, data, {
        headers
      });
      handleApiRes(response.data.message);
      dispatch(getMyLeavesList());
      dispatch(slice.actions.endLoading());
    } catch (error) {
      dispatch(slice.actions.endLoading());
      console.log(error);
    }
  };
}

export function getMyLeavesList(setIsLoading) {
  if (setIsLoading) {
    setIsLoading(true);
  }
  return async () => {
    try {
      dispatch(slice.actions.startLoadingForMyLeavesList());
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/leaves/my-leaves`, { headers });

      dispatch(slice.actions.getMyLeaves(response.data));
      dispatch(slice.actions.endLoadingForMyLeavesList());
    } catch (error) {
      console.log(error);
    } finally {
      if (setIsLoading) {
        setIsLoading(false);
      }
    }
  };
}
export function getAllLeavesList() {
  return async () => {
    try {
      dispatch(slice.actions.startLoadingForAllLeavesList());
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/leaves`, { headers });
      dispatch(slice.actions.getAllLeaves(response.data));
      dispatch(slice.actions.endLoadingForAllLeavesList());
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMyLeavesRequestList(status) {
  console.log("status in slice", status);
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-requests/my-requests`, { headers });
      dispatch(slice.actions.getMyLeavesRequest(response.data));
      dispatch(slice.actions.endLoading());
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllLeavesRequestList() {
  return async () => {
    try {
      dispatch(slice.actions.startLoadingForAllLeavesRequestList());
      const response = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-requests `, { headers });
      dispatch(slice.actions.getAllLeavesRequest(response.data));
      dispatch(slice.actions.endLoadingForAllLeavesRequestList());
    } catch (error) {
      console.log(error);
    }
  };
}

export function createLeavesRequest(data, handleApiRes) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading());
      const response = await axios.post(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-requests`, data, {
        headers
      });
      handleApiRes(response.data.message);
      dispatch(getMyLeavesRequestList());
      dispatch(getMyLeavesList());
      dispatch(slice.actions.endLoading());
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateLeavesRequestStatus(data, handleApiRes) {
  return async (dispatch) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-requests/update-status`, data, {
        headers
      });
      handleApiRes(response.data.message);
      dispatch(getAllLeavesRequestList());
    } catch (error) {
      console.error("API Error:", error);
    }
  };
}

export function updateMyLeavesRequest(id, data, handleApiRes) {
  return async (dispatch) => {
    try {
      console.log(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-requests/${id}`);
      const response = await axios.patch(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-requests/${id}`, data, {
        headers
      });
      handleApiRes(response.data.message);
      dispatch(getMyLeavesRequestList());
      dispatch(getAllLeavesRequestList());
    } catch (error) {
      console.error("API Error:", error);
    }
  };
}

export function deleteLeaveRequest(id, handleApiRes) {
  return async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_HOST_API_KEY}v1/leave-requests/${id}`, { headers });
      handleApiRes(response.data.message);
      dispatch(getMyLeavesRequestList());
      dispatch(getMyLeavesList());
    } catch (error) {
      console.log(error);
      handleApiRes();
    }
  };
}

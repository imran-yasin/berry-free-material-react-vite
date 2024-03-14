// axiosConfig.js
import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_HOST_API_KEY
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("chaudhry error", error);
    // if (error.name === "AxiosError") {
    //   toast.error(error.message, {
    //     autoClose: 10000,
    //     position: "top-right",
    //     closeOnClick: true,
    //     hideProgressBar: false,
    //     pauseOnHover: true,
    //     progress: undefined,
    //     draggable: true,
    //     theme: "colored"
    //   });
    //   return;
    // }
    if (error.response && error.response.data) {
      if (error.response.data.name === "TokenExpiredError" || error.response.data.message === "jwt expired") {
        localStorage.clear();
        window.location.href = "/";
      } else {
        toast.error(error.response.data.message, {
          autoClose: 10000,
          position: "top-right",
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: true,
          progress: undefined,
          draggable: true,
          theme: "colored"
        });
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

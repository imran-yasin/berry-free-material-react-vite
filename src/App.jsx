import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import NavigationScroll from "./layout/NavigationScroll";

import { ToastContainer, toast } from "react-toastify";
import ToasterContext from "./utils/context/toasterContext";

import axios from "./utils/axiosConfig";

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [showToaster, setShowToaster] = useState();

  const toastOption = {
    autoClose: 10000,
    position: "top-right",
    closeOnClick: true,
    hideProgressBar: false,
    pauseOnHover: true,
    progress: undefined,
    draggable: true,
    theme: "colored"
  };

  useEffect(() => {
    localStorage.removeItem("permissions");
    async function permissionsData() {
      if (localStorage.getItem("token")) {
        try {
          // showLoader(true);
          const permissionsResponse = await axios.get(`${import.meta.env.VITE_HOST_API_KEY}v1/permissions/permissions-for-loggedin-user`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          localStorage.setItem("permissions", permissionsResponse.data.data);
        } catch (error) {
          console.log("Error in app.js", error);
          localStorage.removeItem("token");
          localStorage.removeItem("permissions");
          window.location.href = "/";
        }
      }
    }
    permissionsData();
  }, []);

  const fireToasterHandler = (value, message) => {
    if (value) {
      toast.success(message, toastOption);
    } else {
      toast.error(message, toastOption);
    }
    setShowToaster(value);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ToastContainer />
      <ToasterContext.Provider
        value={{
          isSuccess: showToaster,
          fireToasterHandler: fireToasterHandler
        }}
      >
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </ToasterContext.Provider>
    </StyledEngineProvider>
  );
};

export default App;

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loader({ size }) {
  return <CircularProgress color="inherit" size={size} />;
}

// Set default props for the Loader component
Loader.defaultProps = {
  size: 30
};

export default Loader;

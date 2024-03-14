import React from "react";
const ToasterContext = React.createContext({
  isSuccess: false,
  fireToasterHandler: () => {}
});
export default ToasterContext;

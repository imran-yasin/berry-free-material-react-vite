import { createRoot } from "react-dom/client";

// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// project imports
import { TimeSheetProvider } from "./context/TimeSheetContext";
import App from "./App";
import { store } from "./redux/Store";

// style + assets
import config from "./config";
import "./assets/scss/style.scss";

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <TimeSheetProvider>
        <App />
      </TimeSheetProvider>
    </BrowserRouter>
  </Provider>
);

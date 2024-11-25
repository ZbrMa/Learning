import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import "./text.css";
import "./boxModel.css";
import "./grid.css";
import App from "./App";
import { Provider } from "react-redux";
import { userStore } from "./store/userStore";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./context/modalContext";
import { AlertProvider } from "./context/alertContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={userStore}>
      <ModalContextProvider>
        <AlertProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AlertProvider>
      </ModalContextProvider>
    </Provider>
  </React.StrictMode>
);

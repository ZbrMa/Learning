import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import "./text.css";
import "./boxModel.css";
import "./grid.css";
import App from "./App";
import { Provider } from "react-redux";
import { userStore, persistor } from "./store/userStore";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./context/modalContext";
import { AlertProvider } from "./context/alertContext";
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={userStore}>
      <PersistGate loading={<div>Načítání...</div>} persistor={persistor}>
      <ModalContextProvider>
        <AlertProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AlertProvider>
      </ModalContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import "./text.css";
import "./boxModel.css";
import "./grid.css";
import App from "./App";
import { Provider } from "react-redux";
import { reduxStore, persistor } from "./store/reduxStore";
import { BrowserRouter } from "react-router-dom";
import { ModalContextProvider } from "./context/modalContext";
import { AlertProvider } from "./context/alertContext";
import { PersistGate } from "redux-persist/integration/react";
import { I18Provider } from "./i18/i18";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <PersistGate loading={<div>Načítání...</div>} persistor={persistor}>
        <I18Provider>
          <ModalContextProvider>
            <AlertProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AlertProvider>
          </ModalContextProvider>
        </I18Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

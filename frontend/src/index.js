import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import ContextProvidersWrapper from "./context/general/ContextProvidersWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvidersWrapper>
        <App />
      </ContextProvidersWrapper>
    </BrowserRouter>
  </React.StrictMode>
);

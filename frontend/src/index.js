import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvidersWrapper from "./context/general/ContextProvidersWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvidersWrapper>
      <App />
    </ContextProvidersWrapper>
  </React.StrictMode>
);

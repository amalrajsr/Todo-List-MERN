import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./utils/ErrorBoundary";
import ErrorPage from "./pages/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary fallback={<ErrorPage/>}>
    <App />
  </ErrorBoundary>
);

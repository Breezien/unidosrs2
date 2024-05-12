import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./apply.css";
import "../global.css";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
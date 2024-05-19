import ReactDOM from "react-dom/client";
import Handler from "./handler.tsx";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { BrowserRouter } from "react-router-dom";
import "./assets/global.css";
Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Handler />
  </BrowserRouter>
);

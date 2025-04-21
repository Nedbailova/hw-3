import { routesConfig } from "./config/routes";
import './Roboto/fonts.css';
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import 'config/configureMobX';

const router = createHashRouter(routesConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(<RouterProvider router={router} />);
import {
  createBrowserRouter,
} from "react-router-dom";
import { MyKitties } from "./pages/MyKitties";
import { Details } from "./pages/Details";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MyKitties />,
  },
  {
    path: "/details",
    element: <Details />
  },
  {
    path: "test",
    element: <div>Test</div>,
  }
]);


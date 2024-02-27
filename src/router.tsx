import {
  createBrowserRouter,
} from "react-router-dom";
import { MyKitties } from "./pages/MyKitties";
import { Details } from "./pages/Details";
import { Breed } from "./pages/Breed";

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
    path: "/breed",
    element: <Breed />
  },
  {
    path: "test",
    element: <div>Test</div>,
  }
]);


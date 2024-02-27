import {
  createBrowserRouter,
} from "react-router-dom";
import { MyKitties } from "./pages/MyKitties";
import { Details } from "./pages/Details";
import { Breed } from "./pages/Breed";
import { Search } from "./pages/Search";
import { Root } from "./components/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "my-kitties",
        element: <MyKitties />,
      },
      {
        path: "details",
        element: <Details />,
      },
      {
        path: "breed",
        element: <Breed />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "test",
        element: <div>Test</div>,
      },
    ]
  },
]);


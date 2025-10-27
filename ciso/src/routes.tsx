import type { RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

export const routes: RouteObject[] = [
  { path: "/ciso/", element: <Home /> },
  { path: "/ciso/about", element: <About /> },
];
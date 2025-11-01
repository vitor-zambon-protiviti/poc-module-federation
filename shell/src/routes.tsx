import { lazy } from "react";

const Ciso = lazy(() => 
  import("ciso/Main")
    .then(() => import("ciso/index.css"))
);

const routes = [
  { path: "/ciso/*", element: <Ciso /> },
];

export default routes;
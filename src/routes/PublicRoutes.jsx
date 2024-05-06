import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
const Login = lazy(() => import("../pages/auth/Login"));

const PublicRoutes = () =>
  useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

export default PublicRoutes;

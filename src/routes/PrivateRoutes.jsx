import { Navigate, useRoutes } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import PageNotFound from "../pages/404/PageNotFound";
import Login from "../pages/auth/Login";

const PrivateRoutes = () =>
  useRoutes([
    {
      path: "/",
      element: <Navigate replace to="/dashboard" />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ])

export default PrivateRoutes;

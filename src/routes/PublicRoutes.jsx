import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/auth/Login";

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

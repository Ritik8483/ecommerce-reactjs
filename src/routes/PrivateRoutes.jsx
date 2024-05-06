import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const PageNotFound = lazy(() => import("../pages/404/PageNotFound"));
const CartDetail = lazy(() => import("../pages/cart/CartDetail"));

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
      path: "/cart",
      element: <CartDetail />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ])

export default PrivateRoutes;

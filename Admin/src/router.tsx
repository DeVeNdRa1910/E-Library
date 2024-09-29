import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Book from "./pages/Book";
import Resister from "./pages/Resister";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        path: 'home/',
        element: <Home />
      },
      {
        path: 'books/',
        element: <Book />
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'resister',
        element: <Resister />
      },
    ]
  },
])

export default router;
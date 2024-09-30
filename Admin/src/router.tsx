import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Book from "./pages/Book";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import CreateBook from "./pages/createBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "home/",
        element: <Home />,
      },
      {
        path: "books/",
        element: <Book />,
      },
      {
        path: "books/create/",
        element: <CreateBook />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login/",
        element: <Login />,
      },
      {
        path: "resister/",
        element: <Register />,
      },
    ],
  },
]);

export default router;

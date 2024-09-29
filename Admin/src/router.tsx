import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Resister from "./pages/Resister";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/resister',
    element: <Resister />
  },
])

export default router;
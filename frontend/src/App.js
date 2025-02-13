import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { hotelsLoader } from "./loaders/hotelsLoader";
import { destinationLoader } from "./loaders/hotelsLoader";

import PrivateRoute from "./components/PrivateRoute";

import HeaderFooterLayout from "./components/Layout/HeaderFooterLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Hotels from "./pages/Hotels";
import OneHotel from "./pages/OneHotel/OneHotel";
import Registration from "./pages/Registration";
import Account from "./pages/Account";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HeaderFooterLayout />,
    children: [
        {
            index: "true",
            element: <Home />,
            loader: destinationLoader,
        },
        {
            path: "/about",
            element: <About />,
        },
        {
            path: "/hotels",
            element: <Hotels />,
            loader: hotelsLoader,
        },
        {
            path: "/hotel/:id",
            element: <OneHotel />,
        },
        {
            path: "/registration",
            element: <Registration />,
        },
        {
            path: "/account",
            element: <PrivateRoute><Account /></PrivateRoute>,
        },
        {
            path: "/cart",
            element: <Cart />
        },
        {
            path: "*",
            element: <div>404 Not Found</div>,
        }
    ]
  }
])

export default function App() {
  return (
      <RouterProvider router={router} />
  );
}
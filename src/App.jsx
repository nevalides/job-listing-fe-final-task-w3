import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import JobHeader from "./pages/JobHeader.jsx";
import JobList from "./pages/JobList.jsx";
import JobDescription from "./pages/JobDescription.jsx";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  const isLogin = localStorage.getItem("isLogin");
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    if (isLogin) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }

    const intervalId = setInterval(() => {
      const newIsLogin = localStorage.getItem("isLogin");

      if (newIsLogin) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isLogin]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute isAllowed={isAllowed}>
          <Home />
        </PrivateRoute>
      ),
    },
    {
      path: "job",
      element: (
        <PrivateRoute isAllowed={isAllowed}>
          <JobHeader />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <PrivateRoute isAllowed={isAllowed}>
              <JobList />
            </PrivateRoute>
          ),
        },
        {
          path: ":id",
          element: (
            <PrivateRoute isAllowed={isAllowed}>
              <JobDescription />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "login",
      element: <Login setIsAllowed={setIsAllowed} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

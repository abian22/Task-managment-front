import { createBrowserRouter, redirect } from "react-router-dom";
import Index from "../pages/Index/Index";
import CalendarPage from "../pages/CalendarPage/CalendarPage";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import Root from "../layout/Root";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword"; 
import VerifyAccount from "../pages/VerifyAccount/VerifyAccount";
import Profile from "../pages/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />, 
  },
  {
    path: "/verify",
    element: <VerifyAccount />,
  },
  {
    path: "/",
    element: <Root />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/SignIn"); 
      }
      return null;
    },
    children: [
      {
        path: "",
        element: <SignIn />, 
      },
      {
        path: "home",
        element: <Index />,
      },
      {
        path: "Calendar",
        element: <CalendarPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;

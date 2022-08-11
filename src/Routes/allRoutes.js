import React from "react";
import { Redirect } from "react-router-dom";

//Dashboard
import DashboardEcommerce from "../pages/DashboardEcommerce";

//AuthenticationInner pages
import BasicSignIn from '../pages/AuthenticationInner/Login/BasicSignIn';
//pages
import Maintenance from '../pages/Pages/Maintenance/Maintenance';
import ComingSoon from '../pages/Pages/ComingSoon/ComingSoon';
import Basic404 from '../pages/AuthenticationInner/Errors/Basic404';
import Error500 from '../pages/AuthenticationInner/Errors/Error500';
import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";

//login
import Login from "../pages/Authentication/Login.tsx";
import ForgetPasswordPage from "../pages/Authentication/ForgetPassword";
import Logout from "../pages/Authentication/Logout";

// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import ListBranch from "../pages/Restaurant/Branch/ListBranch";

const authProtectedRoutes = [
  { path: "/dashboard", component: DashboardEcommerce },


  { path: "/restaurant/branch", component: ListBranch },

  //User Profile
  { path: "/profile", component: UserProfile },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },

  //AuthenticationInner pages
  { path: "/signin", component: BasicSignIn },
  { path: "/error-404", component: Basic404 },
  { path: "/error-500", component: Error500 },
  { path: "/maintenance", component: Maintenance },
  { path: "/coming-soon", component: ComingSoon },

  { path: "/offline", component: Offlinepage },

];

export { authProtectedRoutes, publicRoutes };
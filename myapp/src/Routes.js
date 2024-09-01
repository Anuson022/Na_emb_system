// routes.js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Admin_dashboard from "./Admin_dashboard";
import Approve from "./Customer_table/Aprrove";
import CusTable_Recheck from "./Customer_table/CusTable_Recheck";
import CusTable_Inprocess from "./Customer_table/CusTable_Inprocess";
import CusTable_Finnished from "./Customer_table/CusTable_Finished";

import Custom_input from "./Custom_input";
import Recheck from "./Recheck";
import NewOrderSubmit from "./Customer_table/NewOrderSubmit";
import Image_input from "./Image_input";
import Test from "./Test";
import DynamicForm from "./DynamicForm";
import Image_AD from "./Image_AD";
import AutoInput from "./AutoInput/AutoInput";
import Login from "./Login_component/Login";
import Login_detect from "./Login_component/Login_detect";
import ProtectedRoute from "./Login_component/ProtectedRoute";
import UserSAED from "./UserEdit/UserSAED";
import UserEdit from "./UserEdit/UserEdit";
import UserAdd from "./UserEdit/UserAdd";
import CusOrderCheck from "./CustomerOrderCheck/CusOrderCheck";

import HomeComponent from "./Admin/HomeComponent";
import MainStatistic from "./StatisticDisplay/MainStatistic";

import Secure_dashboard from "./Login_component/Secure_dashboard";
import Secure_component from "./Login_component/Secure_component";
import HomePage from "./CusPage/HomePage";
import Shirt_graphic_cus from "./Shirt_graphic_cus_const";
import HomeSuggest from "./CusPage/HomeSuggest";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/Na-Karn-puk",
    element: <HomePage />,
    children: [
      {
        path: "Cus-Order-Add",
        element: <Shirt_graphic_cus />,
      },
      {
        path: "Cus-Order-Check",
        element: <CusOrderCheck />,
      },
      {
        path: "Cus-Home",
        element: <HomeSuggest/>,
      },
    ],
  },
  {
    path: "Admin_dashboard",
    element: <Secure_dashboard />,
    children: [
      {
        path: "",
        element: <HomeComponent />,
      },
      {
        path: "ApproveOrder",
        element: <Approve />,
      },
      {
        path: "RecheckTable",
        element: <CusTable_Recheck />,
      },
      {
        path: "CustomerTable",
        element: <CusTable_Inprocess />,
      },
      {
        path: "FinishedTable",
        element: <CusTable_Finnished />,
      },
      {
        path: "User_edit",
        element: <UserSAED />,
      },
      {
        path: "Image_edit",
        element: <Image_AD />,
      },
      {
        path: "UserEdit",
        element: <UserEdit />,
      },
      {
        path: "UserAdd",
        element: <UserAdd />,
      },
      {
        path: "autoinput",
        element: <AutoInput />,
      },
      {
        path: "Test1",
        element: <Test />,
      },
      {
        path: "Statistic-data",
        element: <MainStatistic />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "idk",
    element: <DynamicForm />,
  },
  {
    path: "test-com",
    element: <Recheck />,
  },
  {
    path: "FullOrderAdd",
    element: <Secure_component Page={<NewOrderSubmit />} />,
  },
  {
    path: "test-image",
    element: <Image_input />,
  },
]);

export default Router;

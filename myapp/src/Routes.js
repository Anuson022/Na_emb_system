// routes.js
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Admin_dashboard from './Admin_dashboard';
import Approve from './Customer_table/Aprrove';
import CusTable_Recheck from './Customer_table/CusTable_Recheck';
import CusTable_Inprocess from './Customer_table/CusTable_Inprocess';
import CusTable_Finnished from './Customer_table/CusTable_Finished';

import Custom_input from './Custom_input';
import Recheck from './Recheck';
import Image_input from './Image_input';
import Test from './Test';
import DynamicForm from './DynamicForm';
import Image_AD from './Image_AD';
import AutoInput from './AutoInput/AutoInput'
import Login from './Login_component/Login';
import Login_detect from './Login_component/Login_detect';
import ProtectedRoute from './Login_component/ProtectedRoute'
import Secure_dashboard from './Login_component/Secure_dashboard';
import UserSAED from './UserEdit/UserSAED';
import UserEdit from './UserEdit/UserEdit';
import UserAdd from './UserEdit/UserAdd';
import CusOrderCheck from './CustomerOrderCheck/CusOrderCheck';


import HomeComponent from './Admin/HomeComponent';
import MainStatistic from './StatisticDisplay/MainStatistic';



const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "/CusOrder",
    element: <CusOrderCheck/>,
  },
  {
    path: "Admin_dashboard",
    element: <Secure_dashboard />,
    children: [
        {
            path: "",
            element: <HomeComponent />
        },
        {
            path: "ApproveOrder",
            element: <Approve/>,
        },
        {
            path: "RecheckTable",
            element: <CusTable_Recheck/>,
        },
        {
            path: "CustomerTable",
            element: <CusTable_Inprocess/>,
        },
        {
            path: "FinishedTable",
            element: <CusTable_Finnished/>,
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
          element: <MainStatistic/>,
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
    path: "test-image",
    element: <Image_input />,
  },


]);

export default Router;

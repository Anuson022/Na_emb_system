// routes.js
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Admin_dashboard from './Admin_dashboard';
import Approve from './Customer_table/Aprrove';
import CusTable_Recheck from './Customer_table/CusTable_Recheck';
import CusTable_Inprocess from './Customer_table/CusTable_Inprocess';
import Custom_input from './Custom_input';
import Recheck from './Recheck';
import Image_input from './Image_input';
import Test from './Test';
import DynamicForm from './DynamicForm';
import Image_AD from './Image_AD';
import Login from './Login_component/Login';
import Login_detect from './Login_component/Login_detect';
import ProtectedRoute from './Login_component/ProtectedRoute'
import Secure_dashboard from './Login_component/Secure_dashboard';
import UserSAED from './UserEdit/UserSAED';
import UserEdit from './UserEdit/UserEdit';
import UserAdd from './UserEdit/UserAdd';
import CusOrderCheck from './CustomerOrderCheck/CusOrderCheck';

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
          path: "User_edit",
          element: <UserSAED />,
        },
        {
            path: "Image_edit",
            element: <Image_AD />,
        },
        {
            path: "Test1",
            element: <Test />,
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
  {
    path: "UserEdit",
    element: <UserEdit />,
  },
  {
    path: "UserAdd",
    element: <UserAdd />,
  },

]);

export default Router;

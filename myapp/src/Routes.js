// routes.js
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Admin_dashboard from './Admin_dashboard';
import Customer_table from './Customer_table/CusTable_Recheck';
import Custom_input from './Custom_input';
import TextareaToParagraphs from './TextareaToParagraphs';
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

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "Admin_dashboard",
    element: <Secure_dashboard />,
    children: [
        {
            path: "Customer_table",
            element: <Customer_table />,
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
    element: <TextareaToParagraphs />,
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

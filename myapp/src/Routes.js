// routes.js
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Admin_dashboard from './Admin_dashboard';
import Customer_table from './Customer_table';
import Custom_input from './Custom_input';
import TextareaToParagraphs from './TextareaToParagraphs';
import Image_input from './Image_input';
import Test from './Test';
import DynamicForm from './DynamicForm';
import Image_AD from './Image_AD';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [],
  },
  {
    path: "Admin_dashboard",
    element: <Admin_dashboard />,
    children: [  
        {
            path: "Customer_table",
            element: <Customer_table />,
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
]);

export default Router;

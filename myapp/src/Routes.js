// routes.js
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Admin_dashboard from './Admin_dashboard';
import Customer_table from './Customer_table';
import Custom_input from './Custom_input';
import Student_form from './Student_form';
import TextareaToParagraphs from './TextareaToParagraphs';
import Image_input from './Image_input';

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
    ],
  },

  {
    path: "custom_input",
    element: <Custom_input />,
  },
  {
    path: "idk",
    element: <Student_form />,
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

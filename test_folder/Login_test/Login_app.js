// App.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../myapp/src/Login_component/Login';
import Register from './Register';
import Page1 from './Page1';
import Page2 from './Page2';
import axios from 'axios';
import Login_test from './Login_test';

const Login_app = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  
  useEffect(()=>
    {
      console.log(localStorage)
    })
  const render1 = () => 
    {
      if(role === 'manager')
        {
          return <Page1 handleLogout={handleLogout} />
        }
      else
      {
          return <Page2 handleLogout={handleLogout} />
      }
    }
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken('');
    setRole('');
  };
/*  {
    path: "Login_test",
    element: <Login_app/>,
    children:
    [
      {
        path: "manager",
        element:<Page1/>
      },
      {
        path: "employeee",
        element:<Page2/>
      }
    ]
  },
  {
    path: "page1",
    element:<Page1/>
  },
  {
    path: "page2",
    element:<Page2/>
  },
  {
    path: "register",
    element:<Register/>
  },*/

  return (
      <div>
        {!token ? (
          <>
            <Login_test setToken={setToken} setRole={setRole} />
            <Register />
          </>
        ) : (
          <>
            {render1()}
          <li><Link to="/Admin_dashboard/Customer_table">ที่ต้องตรวจสอบ</Link></li>
          </>
        )}
      </div>
  );
};

export default Login_app;
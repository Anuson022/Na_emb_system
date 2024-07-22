import React, { useEffect, useState } from 'react'

import Login from './Login'
import Admin_dashboard from '../Admin_dashboard'
import { useNavigate } from 'react-router-dom'
import Secure_dashboard from './Secure_dashboard'

function Login_detect() {
  const [Token,SetToken] = useState(localStorage.getItem('token') || "")
  const [IsAuth,SetIsAuth] = useState(false)
  const [UserData,SetUserData] = useState(localStorage.getItem('UserData') || "")
  const navigate_dash = useNavigate();
  useEffect(()=>
    {
      if(!Token)
        {
          navigate_dash('/login')
        }
      else
      {
        Secure_dashboard({IsAuth});
        navigate_dash('/Admin_Dashboard')
      }
    },[IsAuth])
  const Dashboard_Loging = () =>
    {

    }
  return (
    <>
    {!Token? 
    (
      <>
        {<Login SetToken = {SetToken} SetUserData={SetUserData}/>}
      </>
    ):
    (
      <>
        {Dashboard_Loging()}
      </>
    )
    }
    
    </>
  )
}

export default Login_detect
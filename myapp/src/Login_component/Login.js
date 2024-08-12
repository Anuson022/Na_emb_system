import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    const [Username,SetUsername] = useState('')
    const [Password,setPassword] = useState('')
    const navigate_dash = useNavigate();
    useEffect(()=>
        {
            const Token = localStorage.getItem('token');
            const UserData = localStorage.getItem('UserData');
            if (!Token) {    
                navigate_dash('/login');
            } else {
                navigate_dash('/Admin_Dashboard',{state:{Token,UserData}})
            }
        },[navigate_dash])
    const HandleSubmit = async() =>
        {
            
            try {
                const login_data = await axios.post("/na_login",{Username,Password})
                const Token = login_data.data.token
                const UserData = login_data.data.user
                if(Token != null && UserData != null)
                    {
                        localStorage.setItem('token',Token)
                        localStorage.setItem('UserData',JSON.stringify(UserData))
                        navigate_dash('/Admin_Dashboard',{state:{Token,UserData}})
                    }
                else
                {
                    alert("Wrong password")
                }
            } catch (error) {
                console.log(error)
            }
        }

  return (
    <div className='Login-body'>
        <div className='Login-warper'>
            <h1>Login</h1>
            <div className='Login-container'>
            <div className='Login-user'>
                <div className='fa fa-user-circle-o icon1' aria-hidden="true"></div>
                <input type="text" placeholder='โปรดกรอกชื่อผู้ใช้งาน...'
                onChange={(e)=>SetUsername(e.target.value)}
                value={Username}
                />
                
            </div>
            <br />
            <div className='Login-pass'>
                <div class="fa fa-lock fa-3x icon1" aria-hidden="true"></div>
                <input type="password" placeholder='โปรดกรอกรหัสผ่าน...'
                value={Password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <br />
            <div className='Login-button'>
                <button onClick={HandleSubmit}>เข้าสู่ระบบ</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login
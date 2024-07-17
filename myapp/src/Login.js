import React from 'react'
import './Login.css'
function Login() {
  return (
    <div className='Login-body'>
        <div className='Login-warper'>
            <h1>Login</h1>
            <div className='Login-container'>
            <div className='Login-user'>
                <div className='fa fa-user-circle-o icon1' aria-hidden="true"></div>
                <input type="text" placeholder='โปรดกรอกชื่อผู้ใช้งาน...' />
                
            </div>
            <br />
            <div className='Login-pass'>
                <div class="fa fa-lock fa-3x icon1" aria-hidden="true"></div>
                <input type="text" placeholder='โปรดกรอกรหัสผ่าน...'/>
            </div>
            <br />
            <div className='Login-button'>
                <button>เข้าสู่ระบบ</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login
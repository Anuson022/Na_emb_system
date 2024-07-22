import React, { useEffect, useState } from 'react'
import {useNavigate } from "react-router-dom";
import './UserSAED.css'
import axios from 'axios'

function UserSAED() {
  const [FetchUsers,SetFetchUsers] = useState([]);
  const [Search,SetSearch] = useState('')
  const NavigateUserto = useNavigate();
  const FetchingUser = async() =>
    {
      const res = await axios.post('/users_account',Search);
      SetFetchUsers(res.data)
      console.log(res.data)
    }    
  useEffect(()=>
    {
      FetchingUser()
    },[Search])

  const HandleSearch = async(e) =>
    {
      const searching = e.target.value
      const res = await axios.post('/users_account',{searching});
      SetFetchUsers(res.data)
      console.log(res.data)
    }
  const User_edit = (e) =>
    {
      const UserID = e
      NavigateUserto('/UserEdit' ,{state : {UserID}})
    }
  const User_delete = (e) =>
    {
      
    }
  const User_add = (e) =>
    {
      NavigateUserto('/UserAdd')
    }
  return (
    <div className="User-form">
        <h1>ข้อมูลพนักงาน</h1>
        <div>
          <input onChange={HandleSearch}  style={{width:"100%"}} type="text" />
        </div>
        <br />
        <div className='User-grid'>
          {FetchUsers.map((item)=>
            (
              <div className='User-item' key={item.id}>
                <div className='User-profile'>
                  <img src="\General_image\Na_logo.png" alt="" srcset="" /></div>
                <div>
                  <p className='p-static'>ชื่อผู้ใช้งาน : </p>
                  <p className='p-value'>{item.username}</p>
                </div>
                <div>
                  <p className='p-static'>รหัสผ่าน : </p>
                  <p className='p-value'>{item.password}</p>
                  </div>
                <div>
                  <p className='p-static'>ตำแหน่ง : </p>
                  <p className='p-value'>{item.role}</p>
                </div>
                <div className='User-button'>
                  <button onClick={() => User_edit(item.id)}>แก้ไข</button>
                  <button onClick={() => User_edit(item.id)}>ลบ</button>
                </div>
              </div>
            ))}
          <div>
          <div className='User-add' >
            <button onClick={User_add}>
              <img src="\General_image\Add+.png" alt="" />
            </button>
              </div>
          </div>
        </div>
    </div>
  )
}

export default UserSAED
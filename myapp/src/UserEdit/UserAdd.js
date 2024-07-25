import React, { useState } from 'react'
import './UserSAED.css'
import axios from 'axios';
function UserAdd() {
    const [AccountData,SetAccountData] = useState(
        {
            username: '',
            password: '',
            role: 'employee',
        })
    const [Profile,SetProfile] = useState(null)
    const HandleSubmit = async(e) =>
        {
            e.preventDefault();
            const formData = new FormData();
            formData.append('file', Profile);
            formData.append('AccountData',JSON.stringify(AccountData));
            console.log(AccountData)
            const res = await axios.post('/AcountCreate', formData);;
            console.log(res.data)
        }
    const HandleChange = async(e) =>
        {
            const {name,value} = e.target;
            SetAccountData(
                {
                    ...AccountData,
                    [name]:value
                })
        }
    const HandleFile = async(e) =>
        {
            SetProfile(e.target.files[0]);
        }
  return (
    <div>
        <form onSubmit={HandleSubmit}>
            <fieldset>
                <legend><h1>สร้างบัญชีผู้ใช้งาน</h1></legend>
                <h1>ชื่อผู้ใช้งาน</h1>
                <input type="text" 
                name='username' 
                onChange={HandleChange}/>
                <h1>รหัสผ่าน</h1>
                <input type="text" 
                name='password' 
                onChange={HandleChange}/>
                <h1>ตำแหน่ง</h1>
                <select name='role' 
                onChange={HandleChange}>
                    <option value="employee">พนักงาน</option>
                    <option value="manager">ผู้จัดการ</option>
                </select>
                <h1>รูปโปรไฟล์</h1>
                <input type="file" onChange={HandleFile}/>
            </fieldset>
            <button type="submit">submit</button>
        </form>
    </div>
  )
}

export default UserAdd
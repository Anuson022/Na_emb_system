import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
function UserEdit({ID}) {
  const [AccountData, SetAccountData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [Profile, SetProfile] = useState(null);
  const [ShowProfile, SetShowProfile] = useState('/General_image/No-profile.jpg');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const FetchData = async() =>
    {
      const response = await axios.post("/account_edit_get",{ID})
      console.log(ID)
      console.log(response.data)
      const User_obj = response.data[0]
      console.log(User_obj.username)
      SetAccountData(prevState => ({
        ...prevState,
        username:  User_obj.username,
        password: User_obj.password,
        role: User_obj.role
      }));
      SetShowProfile(`/profile/${User_obj.profile.split("/").pop()}`)
    }
   useEffect(()=>
    {
        FetchData();
    },[])

    const HandleSubmit = async (e) => {
      if(!AccountData.username || !AccountData.password || !AccountData.role)
        {
          return alert('ไม่สามารถแก้ไขได้')
        }
      const formData = new FormData();
      formData.append("file", Profile);
      formData.append("AccountData", JSON.stringify(AccountData));
      formData.append("EditID", ID);

      console.log(AccountData);
      const res = await axios.post("/AcountEdit", formData);
      console.log(res.data);
      setModalIsOpen(false); // Close the modal after submission
    };
  
    const HandleChange = async (e) => {
      const { name, value } = e.target;
      SetAccountData({
        ...AccountData,
        [name]: value,
      });
    };
  
    const HandleFile = async (e) => {
      SetProfile(e.target.files[0]);
      SetShowProfile(URL.createObjectURL(e.target.files[0]));
    };
  return (
    <div>
        <form onSubmit={HandleSubmit} className="UserAdd-form">
          <fieldset>
            <legend>
              <h1>แก้ไขบัญชีผู้ใช้งาน</h1>
            </legend>
            <div className="UserAdd-form-main">
              <div className="Form-Profile">
                <h1>รูปโปรไฟล์</h1>
                <img src={ShowProfile} alt="" />
                <div className="Input-profile">
                  <input 
                    type="file" 
                    onChange={HandleFile} 
                    id="fileInput" 
                    style={{ display: 'none' }} // Hide the input
                  />
                  <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                    แก้ไขรูปภาพ
                  </label>
                </div>
              </div>
              <h1>ชื่อผู้ใช้งาน</h1>
              <input type="text" name="username" value={AccountData.username} onChange={HandleChange} />
              <h1>รหัสผ่าน</h1>
              <input type="text" name="password" value={AccountData.password} onChange={HandleChange} />
              <h1>ตำแหน่ง</h1>
              <select name="role" value={AccountData.role}  onChange={HandleChange}>
                <option value="employee">พนักงาน</option>
                <option value="manager">ผู้จัดการ</option>
              </select>
            </div>
          </fieldset>
          <br />
          <button type="submit">ยืนยัน</button>
        </form>
    </div>
  )
}

export default UserEdit
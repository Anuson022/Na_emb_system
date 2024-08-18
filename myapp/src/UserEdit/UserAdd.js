import React, { useState } from "react";
import "./UserSAED.css";
import axios from "axios";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/*Modal.setAppElement('#root'); // For accessibility reasons*/

function UserAdd() {
  const [AccountData, SetAccountData] = useState({
    username: "",
    password: "",
    role: "employee",
  });
  const [Profile, SetProfile] = useState(null);
  const [ShowProfile, SetShowProfile] = useState('/General_image/No-profile.jpg');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const HandleSubmit = async (e) => {
    if(!Profile || !AccountData.username || !AccountData.password || !AccountData.role)
      {
        return alert('ไม่สามารถแก้ไขได้')
      }
    const formData = new FormData();
    formData.append("file", Profile);
    formData.append("AccountData", JSON.stringify(AccountData));
    
    console.log(AccountData);
    const res = await axios.post("/AcountCreate", formData);
    console.log(res.data);
    setModalIsOpen(false);
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
              <h1>สร้างบัญชีผู้ใช้งาน</h1>
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
                    โปรดอัพโหลดรูปภาพ
                  </label>
                </div>
              </div>
              <h1>ชื่อผู้ใช้งาน</h1>
              <input type="text" name="username" onChange={HandleChange} />
              <h1>รหัสผ่าน</h1>
              <input type="text" name="password" onChange={HandleChange} />
              <h1>ตำแหน่ง</h1>
              <select name="role" onChange={HandleChange}>
                <option value="employee">พนักงาน</option>
                <option value="manager">ผู้จัดการ</option>
              </select>
            </div>
          </fieldset>
          <br />
          <button type="submit">ยืนยัน</button>
        </form>
        
    </div>
  );
}

export default UserAdd;

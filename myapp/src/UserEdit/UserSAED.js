import React, { useEffect, useState } from 'react'
import {useNavigate } from "react-router-dom";
import './UserSAED.css'
import axios from 'axios'
import Modal from "react-modal";
import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import UserDelete from './UserDelete';

function UserSAED() {
  const [FetchUsers,SetFetchUsers] = useState([]);
  const [Search,SetSearch] = useState('')
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [ShowDelete, setShowDelete] = useState(false);

  const [EditID, setEditID] = useState("");


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
      NavigateUserto('/Admin_dashboard/UserEdit' ,{state : {UserID}})
    }
  const UserDelete = async() =>
    {
      alert(EditID)
      await axios.delete(`/user_delete/${EditID}`);
    }
  const User_add = (e) =>
    {
      NavigateUserto('/Admin_dashboard/UserAdd')
    }
  return (
    <div className="User-form">
        <h1>ข้อมูลพนักงาน</h1>
        <div style={{display:"flex",gap:"1rem",alignItems:'center'}}>
          <p style={{fontSize:"1rem"}}>ค้นหา</p>
          <input onChange={HandleSearch}  style={{width:"100%",height:"2rem",fontSize:"1rem"}} type="text" />
        </div>
        <br />
        <div>
        <div className='User-grid'>
          {FetchUsers.map((item)=>
            (
              <>
              <div className='User-item' key={item.id}>
                <div>
                <div className='User-profile'>
                  <img src={`/profile/${item.profile.split("/").pop()}`} alt="" srcset="" />
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
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
                </div>
                </div>
                <div className='User-button'>
                  <button onClick={() => {setModalEdit(true); setEditID(item.id);}}>แก้ไข</button>
                  <button onClick={() => {setShowDelete(true); setEditID(item.id);}}>ลบ</button>
                </div>
              </div>
              </>
            ))}
          <div>
            {/*<div className='User-add' >
            <button onClick={User_add}>
              <img src="\General_image\Add+.png" alt="" />
            </button>
              </div>*/}
          </div>
        </div>

        <div className='User-add' >
            <button onClick={() => setModalAdd(true)}>
            เพิ่มบัญชีผู้ใช้งาน
            </button>
              </div>
        </div>
        <Modal
        isOpen={modalAdd}
        onRequestClose={() => setModalAdd(false)}
        contentLabel="User Add Modal"
        className="UserAdd-modal"
        overlayClassName="UserAdd-overlay"
        >
        <UserAdd/>
        </Modal>

        <Modal
        isOpen={modalEdit}
        onRequestClose={() => setModalEdit(false)}
        contentLabel="User Add Modal"
        className="UserAdd-modal"
        overlayClassName="UserAdd-overlay"
        >
        <UserEdit ID={EditID}/>
        </Modal>

        {ShowDelete && (
              <SweetAlert
              warning
                title="ลบบัญชีผู้ใช้งานหรือไม่"
                onConfirm={()=>
                  {
                    UserDelete()
                  }}
                onCancel={()=>{setShowDelete(false)}}
                
                confirmBtnText="ใช่"
                cancelBtnText="ไม่"
                showCancel
                confirmBtnCssClass="btn-custom"
                cancelBtnCssClass="btn-custom"
                customClass="custom-sweetalert" // Custom class
                style={{ display: "flex", minWidth: "15rem", width: "22rem" }}
              ></SweetAlert>
            )}
    </div>
  )
}

export default UserSAED
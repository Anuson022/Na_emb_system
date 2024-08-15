import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserSAED.css";
import axios from "axios";
import Modal from "react-modal";
import SweetAlert from "react-bootstrap-sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";

function UserSAED() {
  const [FetchUsers, SetFetchUsers] = useState([]);
  const [Search, SetSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Number of orders to show per page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const UserLimit = FetchUsers.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(FetchUsers.length / ordersPerPage);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [ShowDelete, setShowDelete] = useState(false);

  const [EditID, setEditID] = useState("");

  
  const NavigateUserto = useNavigate();
  const FetchingUser = async () => {
    const res = await axios.post("/users_account", Search);
    SetFetchUsers(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    FetchingUser();
  }, [Search]);

  const HandleSearch = async (e) => {
    const searching = e.target.value;
    const res = await axios.post("/users_account", { searching });
    SetFetchUsers(res.data);
    console.log(res.data);
  };
  const User_edit = (e) => {
    const UserID = e;
    NavigateUserto("/Admin_dashboard/UserEdit", { state: { UserID } });
  };
  const UserDelete = async () => {
    await axios.delete(`/user_delete/${EditID}`);
  };
  const User_add = (e) => {
    NavigateUserto("/Admin_dashboard/UserAdd");
  };
  return (
    <div className="User-form">
      <h1>ข้อมูลพนักงาน</h1>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <p style={{ fontSize: "1rem" }}>ค้นหา</p>
        <input
          onChange={HandleSearch}
          style={{ width: "100%", height: "2rem", fontSize: "1rem" }}
          type="text"
        />
      </div>
      <div>
        <div className="User-grid" style={{overflowX:'auto'}}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Profile</th>
                <th>Username</th>
                <th>Password</th>
                <th>Role</th>
                <th></th>
                <th></th>
                
              </tr>
            </thead>
            <tbody>
              {UserLimit.map((item) => (
                <>
                  <div key={item.id}></div>
                  <tr>
                    <td>{item.id}</td>
                    <td><img style={{width:'5rem',height:'5rem'}} src={`/profile/${item.profile.split("/").pop()}`} alt="" srcset="" /></td>
                    <td>{item.username}</td>
                    <td>{item.password}</td>
                    <td>{item.role}</td>
                    <td><button onClick={() => {setModalEdit(true); setEditID(item.id);}}>แก้ไข</button></td>
                    <td><button onClick={() => {setShowDelete(true); setEditID(item.id);}}>ลบ</button></td>
                    
                    
                  </tr>
                  
                </>
              ))}
            </tbody>
          </table>
          <div>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
            fontSize: "16px",
            backgroundColor: currentPage === 1 ? "#ccc" : "#405cf5",
            color: "#fff",
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: "16px", margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            backgroundColor:
              currentPage === totalPages ? "#ccc" : "#405cf5",
            color: "#fff",
          }}
        >
          Next
        </button>
      </div>
          </div>
        </div>

        <div className="User-add">
          <button onClick={() => setModalAdd(true)}>เพิ่มบัญชีผู้ใช้งาน</button>
        </div>
      </div>
      <Modal
        isOpen={modalAdd}
        onRequestClose={() => setModalAdd(false)}
        contentLabel="User Add Modal"
        className="UserAdd-modal"
        overlayClassName="UserAdd-overlay"
      >
        <UserAdd />
      </Modal>

      <Modal
        isOpen={modalEdit}
        onRequestClose={() => setModalEdit(false)}
        contentLabel="User Add Modal"
        className="UserAdd-modal"
        overlayClassName="UserAdd-overlay"
      >
        <UserEdit ID={EditID} />
      </Modal>

      {ShowDelete && (
        <SweetAlert
          warning
          title="ลบบัญชีผู้ใช้งานหรือไม่"
          onConfirm={() => {
            UserDelete();
          }}
          onCancel={() => {
            setShowDelete(false);
          }}
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
  );
}

export default UserSAED;

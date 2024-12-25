/*import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import yes_no_Popup from "./yes_no_Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from 'sweetalert2';
import {
  faMagnifyingGlass,
  faFileInvoice,
  faFileContract,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AutoShirt from "./AutoShirt";

const AutoInput = () => {
  const Navigate = useNavigate("");
  const [FetchUsers, SetFetchUsers] = useState([]);
  const [Search, SetSearch] = useState("");
  const [popup_view, setpopup_view] = useState({});
  const [showpopup_view, setshowpopup_view] = useState(false);
  const [ShirtData, SetShirtData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Number of orders to show per page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const UserLimit = FetchUsers.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(FetchUsers.length / ordersPerPage);
  const fetchData = async () => {
    const response = await axios.get("/api/autoform");
    SetFetchUsers(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleShowPopup_view = async (cus_id, school_name, shirtInfo) => {
    await setpopup_view(cus_id);
    await SetShirtData({
      shirt: shirtInfo,
    });
    console.log(shirtInfo);
    setshowpopup_view(true);
  };

  const handleNo = () => {
    setshowpopup_view(false);
  };
  const handleClick = (school_ID,school_name) => {
    Navigate("/AutoFormAdd", { state:{ school_ID , school_name } });
  };
  const handleAdd = () => {
    const school_ID = null;
    const school_name = null;
    Navigate("/AutoFormAdd", { state:{ school_ID , school_name } });
  };
  const onDeleteFile = async (id,name) => {
    try {
        Swal.fire({
            title: "ต้องการลบไฟล์หรือไม่?",
            text: name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText:'ไม่ลบ',
            confirmButtonText: "ลบ",
            reverseButtons: true 
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/autoform_delete/${id}`);
                fetchData();
                Swal.fire({
                title: "ลบสำเร็จ",
                text: "ลบ" + name,
                icon: "success"
              });
            }
          });
          fetchData();
    } catch (error) {
        Swal.fire({
            title: 'เกิดข้อผิดพลาด',
            text: 'ไม่สามารถลบได้ กรุณาลองอีกครั้ง',
            icon: "error",
            confirmButtonText: 'OK'
        });
    }


};
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
  return (
    <div>
      <div
        style={{
          backgroundColor: "#D32D41",
          color: "white",
          padding: "0.1rem 1rem",
        }}
      >
        <h2>ข้อมูลการปัก</h2>
      </div>
      <div style={{ padding: "1rem" }}>
        <div className="User-grid" style={{ overflowX: "auto" }}>
          <table className="styled-table">
            <thead>
              <tr>
                <th>รหัสโรงเรียน</th>
                <th>ชื่อโรงเรียน</th>
                <th>ข้อมูลการปักของโรงเรียน</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {UserLimit.map((item) => {
                const shirt_ = JSON.parse(item.school_form);
                return (
                  <>
                    <div key={item.id}></div>
                    <tr>
                      <td>{item.SC_ID}</td>
                      <td>{item.school_name}</td>
                      <td className="info_text">
                        <div
                          onClick={() =>
                            handleShowPopup_view(
                              item.SC_ID,
                              item.school_name,
                              JSON.parse(item.school_form)
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faFileContract} />
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "1rem" }}>
                          <button
                            onClick={() =>
                              handleClick(
                                item.SC_ID,
                                item.school_name
                              )
                            }
                            style={{ backgroundColor: "#007bff" }}
                            className="UserEditbtn"
                          >
                            แก้ไข
                          </button>
                          <button
                            onClick={onDeleteFile.bind(
                              this,
                              item.SC_ID,
                              item.school_name
                            )}
                            className="UserEditbtn"
                            style={{ backgroundColor: "red", color: "white" }}
                          >
                            ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          {showpopup_view && (
            <div className="popup">
              <div className="popup-shirt">
                <div className="button-close">
                  <button onClick={handleNo}>
                    {<FontAwesomeIcon icon={faXmark} />}
                    <span>ปิดหน้าแสดงข้อมูลการปัก</span>
                    {<FontAwesomeIcon icon={faXmark} />}
                  </button>
                </div>
                <div></div>
                <div className="Shirt-data" style={{}}>
                  <p
                    style={{
                      wordWrap: "break-word",
                      whiteSpace: "-moz-pre-wrap",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <strong>โรงเรียน : </strong>
                    <span>{ShirtData.school_name}</span>
                  </p>
                </div>
                {
                  <div className="Shirt-data">
                    <h6 style={{ margin: "0 0rem", textAlign: "center" }}>
                      เสื้อนักเรียน
                    </h6>
                    <div>
                      <AutoShirt cus_id={popup_view} type={"auto"} />
                      {ShirtData.shirt?.SName.fullname && (
                        <p>
                          <strong>ชื่อ-นามสกุล : </strong>
                          <span>{ShirtData.shirt?.SName.fullname}</span>
                        </p>
                      )}
                      {ShirtData.shirt?.SUndername.under_name && (
                        <p>
                          <strong>การปักใต้ชื่อ : </strong>
                          <span>{ShirtData.shirt?.SUndername.under_name}</span>
                        </p>
                      )}
                      {ShirtData.shirt?.SLogo.school_name && (
                        <p>
                          <strong>โลโก้โรงเรียน : </strong>
                          <span>{ShirtData.shirt?.SLogo.school_name}</span>
                        </p>
                      )}
                      {ShirtData.shirt?.SSchool.name && (
                        <p>
                          <strong>ตัวย่อโรงเรียน : </strong>
                          <span>{ShirtData.shirt?.SSchool.name}</span>
                        </p>
                      )}
                      {ShirtData.shirt?.SUnderschool.under_school && (
                        <p>
                          <strong>ตัวย่อโรงเรียน : </strong>
                          <span>
                            {ShirtData.shirt?.SUnderschool.under_school}
                          </span>
                        </p>
                      )}
                      {ShirtData.shirt?.dot.type && (
                        <p>
                          <strong>ปักเพิ่มเติม : </strong>
                          <span>{ShirtData.shirt?.dot.amount_dot} </span>
                          <span>{ShirtData.shirt?.dot.type} </span>
                          <span>{ShirtData.shirt?.dot.position} </span>
                        </p>
                      )}
                    </div>
                  </div>
                }
              </div>
            </div>
          )}
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
          <button
            onClick={handleAdd}
          >
            เพิ่มข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
};
export default AutoInput;*/

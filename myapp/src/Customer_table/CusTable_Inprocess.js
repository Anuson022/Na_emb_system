import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import yes_no_Popup from "./yes_no_Popup";
import "./CustomerTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFileInvoice,
  faRectangleXmark,
  faXmark,
  faSearch,
  faFileContract,
} from "@fortawesome/free-solid-svg-icons";
import SweetAlert from "react-bootstrap-sweetalert";
import ShirtOrder from "./ShirtOrder";

const ITEMS_PER_PAGE = 5;
const Customer_table = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data
    ? data.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : [];
  const [Status, SetStatus] = useState();

  const [popup_view, setpopup_view] = useState({});
  const [ShirtData, SetShirtData] = useState({});

  const [popup_bill, setpopup_bil] = useState([]);
  const [PricePaid, SetPricePaid] = useState({});

  const [showpopup_delete, setshowpopup_delete] = useState(false);
  const [showpopup_view, setshowpopup_view] = useState(false);
  const [showpopup_bill, setshowpopup_bill] = useState(false);

  const [popup_delete, setPopupDelete] = useState(null);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const handleShowPopup_view = async (cus_id, shirtInfo) => {
    await setpopup_view(cus_id);
    await SetShirtData(shirtInfo);
    await console.log(shirtInfo.SName.fullname);
    console.log(shirtInfo);
    console.log();
    setshowpopup_view(true);
  };
  const handleShowPopup_bill = async (
    BillInfo,
    Order_sum,
    Order_paid,
    Date_time
  ) => {
    await setpopup_bil(BillInfo);
    const NewDate = new Date(Date_time);
    const formattedDate = NewDate.toLocaleDateString();
    const formattedTime = NewDate.toLocaleTimeString();
    await SetPricePaid({ Order_sum, Order_paid, formattedDate });
    //await console.log(popup_view.shirtInfo.SName.fullname)
    setshowpopup_bill(true);
  };

  const handleShowPopupDelete = (cus_id) => {
    setPopupDelete(cus_id);
    setShowPopupDelete(true);
  };
  
  const handleYesDelete = async () => {
    try {
      const response = await axios.delete(`/delete_cusdata/${popup_delete}`);
      console.log("Data deleted successfully:", response.data);
      fetching_data(currentPage); // Refresh the orders list
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setShowPopupDelete(false);
  };

  const handleNo = () => {
    setshowpopup_delete(false);
    setshowpopup_view(false);
    setshowpopup_bill(false);
  };

  useEffect(() => {
    fetching_data(currentPage);
    handleSearch();
    setCurrentPage(1);
  }, [currentPage]);
  useEffect(() => {
    if (searchTerm.length === 0) {
      handleSearch();
      setCurrentPage(1);
    }
  }, [searchTerm]);

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
  const fetching_data = async (page) => {
    const response = await axios
      .post("/search_cus2", { searchTerm })
      .then((response) => {
        setData(response.data);
        // Extract column headers from the data keys
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      }).finally;
    {
    }
  };
  const handleSearch = async (e) => {
    if (e && e.target) {
      const searchTerm = e.target.value
      setSearchTerm(e.target.value)
      try {
        const response = await axios.post("/search_cus2", { searchTerm });
        setData(response.data);
        
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

  };

  const navigate = useNavigate();

  const handleClick = (cus_id, info, parent_name, phone_number, status) => {
    const cus_data = { cus_id, info, parent_name, phone_number, status };
    navigate("/test-com", { state: { cus_data } });
  };
  const HandleStatus = async (cus_id, status) => {
    const change_id = cus_id;
    const change_status = status;
    const update_status = await axios.post("/update_status", {
      change_id,
      change_status,
    });
    alert(update_status.data);
    fetching_data(currentPage);
  };
  const IsPaidReturn = (is_paid) => {
    const test = parseInt(is_paid);
    if (test === 0) {
      return <h1>ยังไม่ชำระเงิน</h1>;
    } else if (test === 1) {
      return <h1>ชำระเงินแล้ว</h1>;
    } else {
      return null;
    }
  };
  return (
    <div style={{ height: "58rem" }}>
      <div
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "0.1rem 1rem",
        }}
      >
        <h2>จัดการข้อมูลลูกค้า (สถานะกำลังดำเนินการ)</h2>
      </div>
      <div class="search-container" style={{marginBottom:'-1rem'}}>
        <input
          type="text"
          placeholder="ค้นหา..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
        />

      </div>
      <div class="container_customer_table">
        <table>
          <thead className="table_head">
            <tr>
              <th>รหัสลูกค้า</th>
              <th>รายละเอียดการปัก</th>
              <th>ชื่อผู้สั่ง</th>
              <th>เบอร์โทร</th>
              <th>สถานะ</th>
              <th>บิล</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {data ? (
              currentItems.map((item) => {
                const shirtDetails = JSON.parse(item.shirt);
                const Order_obj = JSON.parse(item.cus_order);
                const Order_sum = item.price;
                const Order_paid = item.is_paid;
                const Date_time = item.date_time;
                return (
                  <tr key={item.cus_id}>
                    <td className="td_nowarp">{item.cus_id}</td>
                    <td className="info_text">
                      <div
                        onClick={() =>
                          handleShowPopup_view(item.cus_id, shirtDetails)
                        }
                      >
                        <FontAwesomeIcon icon={faFileContract} />
                      </div>
                    </td>
                    <td className="td_nowarp">{item.parent_name}</td>
                    <td className="td_nowarp">{item.phone_number}</td>
                    <td className="td_nowarp">
                      <select
                        value={item.status}
                        onChange={(event) =>
                          HandleStatus(item.cus_id, event.target.value)
                        }
                      >
                        <option value="การปักเสร็จสิ้น">การปักเสร็จสิ้น</option>
                        <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                        <option value="ยังไม่ตรวจสอบ">ยังไม่ตรวจสอบ</option>
                      </select>
                    </td>
                    <td className="td_nowarp">
                      <div
                        className="view-order"
                        onClick={() =>
                          handleShowPopup_bill(
                            Order_obj,
                            Order_sum,
                            Order_paid,
                            Date_time
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faFileInvoice} />
                      </div>{" "}
                    </td>
                    <td className="td_nowarp">
                      <button
                        onClick={() =>
                          handleClick(
                            item.cus_id,
                            item.info,
                            item.parent_name,
                            item.phone_number,
                            item.status
                          )
                        }
                        style={{ backgroundColor: "#007bff" }}
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleShowPopupDelete(item.cus_id)}
                        style={{ backgroundColor: "red" }}>
                        ลบ
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <>
                <tr>
                  <td colSpan="8" className="text-center">
                    No data
                  </td>
                </tr>{" "}
              </>
            )}
          </tbody>
        </table>

        {showpopup_view && (
          <div className="popup">
            <div className="popup-shirt">
              <div className="button-close">
                <button onClick={handleNo}>
                  {<FontAwesomeIcon icon={faXmark} />}
                </button>
                <br></br>
                <br></br>
              </div>
              <div className="Shirt-data">
                <ShirtOrder cus_id={popup_view} />
                {ShirtData.SName.fullname && (
                  <p>
                    <strong>ชื่อ-นามสกุล : </strong>
                    <span>{ShirtData.SName.fullname}</span>
                  </p>
                )}
                {ShirtData.SSchool.name && (
                  <p>
                    <strong>ตัวย่อโรงเรียน : </strong>
                    <span>{ShirtData.SSchool.name}</span>
                  </p>
                )}
                {ShirtData.SLogo.school_name && (
                  <p>
                    <strong>โลโก้โรงเรียน : </strong>
                    <span>{ShirtData.SLogo.school_name}</span>
                  </p>
                )}
                {ShirtData.dot.type && (
                  <p>
                    <strong>ปักเพิ่มเติม : </strong>
                    <span>{ShirtData.dot.amount_dot} </span>
                    <span>{ShirtData.dot.type} </span>
                    <span>{ShirtData.dot.position} </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {showpopup_bill && (
          <div className="popup">
            <div className="popup-bill">
              <div className="button-close">
                <button onClick={handleNo}>
                  {<FontAwesomeIcon icon={faXmark} />}
                </button>
              </div>
              <div className="bill-data">
                <h2>{PricePaid.formattedDate}</h2>
                <div className="bill-table">
                  <table>
                    <thead>
                      <tr>
                        <th>ลำดับที่</th>
                        <th>รายการ</th>
                        <th>จำนวน</th>
                        <th>ราคา/หน่วย</th>
                        <th>ราคา</th>
                      </tr>
                    </thead>
                    <tbody>
                      {popup_bill.map((item) => (
                        <>
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.value1}</td>
                            <td>{item.value2}</td>
                            <td>{item.value3}</td>
                            <td>{item.value4}</td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                    <tr className="sumprice">
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        ราคารวม
                      </td>
                      <td>{PricePaid.Order_sum}</td>
                    </tr>
                  </table>
                  {IsPaidReturn(PricePaid.Order_paid)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {data && (
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
              backgroundColor: currentPage === totalPages ? "#ccc" : "#405cf5",
              color: "#fff",
            }}
          >
            Next
          </button>
        </div>
      )}
      {showPopupDelete && (
        <SweetAlert
          warning
          title="ลบออเดอร์หรือไม่"
          onConfirm={() => {
            handleYesDelete();
          }}
          onCancel={() => {
            setShowPopupDelete(false);
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
};
export default Customer_table;

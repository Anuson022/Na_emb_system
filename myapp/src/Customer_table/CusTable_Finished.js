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
import ShirtOrderPE from "./ShirtOrderPE";
import ShirtOrderScout from "./ShirtOrderScout";

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
  const [showPopupStatus, setShowPopupStatus] = useState(false);

  const handleShowPopup_view = async (
    cus_id,
    info_detail,
    shirtInfo,
    shirt_PE,
    shirt_scout
  ) => {
    await setpopup_view(cus_id);
    await SetShirtData({
      info: info_detail,
      shirt: shirtInfo,
      PE: shirt_PE,
      scout: shirt_scout,
    });
    setshowpopup_view(true);
  };
  const handleShowPopup_bill = async (
    BillInfo,
    Order_sum,
    Order_paid,
    Date_time,
    Approve_by
  ) => {
    await setpopup_bil(BillInfo);
    const NewDate = new Date(Date_time);
    const formattedDate = NewDate.toLocaleDateString();
    const formattedTime = NewDate.toLocaleTimeString();
    await SetPricePaid({
      Order_sum,
      Order_paid,
      formattedDate,
      formattedTime,
      Approve_by,
    });
    //await console.log(popup_view.shirtInfo.SName.fullname)
    setshowpopup_bill(true);
  };

  const handleShowPopupDelete = (cus_id) => {
    setPopupDelete(cus_id);
    setShowPopupDelete(true);
  };
  const handleShowPopupStatus = (cus_id) => {
    setPopupDelete(cus_id);
    setShowPopupStatus(true);
  };
  const handleYesDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/delete_cusdata/${popup_delete}`
      );
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
    setShowPopupStatus(false);
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
      .post("/api/search_cus3", { searchTerm })
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
      const searchTerm = e.target.value;
      setSearchTerm(e.target.value);
      try {
        const response = await axios.post("/api/search_cus3", { searchTerm });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const navigate = useNavigate();

  const handleClick = (cus_id, info, parent_name, phone_number, status) => {
    const cus_data = { cus_id, info, parent_name, phone_number, status };
    navigate("/test_com", { state: { cus_data } });
  };
  const HandleStatus = async (cus_id, status) => {
    const change_id = cus_id;
    const change_status = status;
    const update_status = await axios.post("/api/update_status", {
      change_id,
      change_status,
    });
    handleShowPopupStatus(cus_id);
    fetching_data(currentPage);
  };
  const IsPaidReturn = (is_paid) => {
    const test = parseInt(is_paid);
    if (test === 0) {
      return <h1>สถานะ : ยังไม่ชำระเงิน</h1>;
    } else if (test === 1) {
      return <h1>สถานะ : ชำระเงินแล้ว</h1>;
    } else {
      return null;
    }
  };
  function handlePrint() {
    const originalContents = document.body.innerHTML;
    const popupContents = document.querySelector(".popup").innerHTML;

    document.body.innerHTML = popupContents;

    window.print();

    document.body.innerHTML = originalContents;

    // Re-attach event listeners, if necessary
    window.location.reload();
  }
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
      <div class="search-container" style={{ marginBottom: "-1rem" }}>
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
                const shirt_info = item.info;
                const shirt_ = JSON.parse(item.shirt);
                const shirt_PE = JSON.parse(item.PE);
                const shirt_scout = JSON.parse(item.scout);
                const Order_obj = JSON.parse(item.cus_order);
                const Order_sum = item.price;
                const Order_paid = item.is_paid;
                const Date_time = item.date_time;
                const Approve_by = item.approve_by;
                return (
                  <tr key={item.cus_id}>
                    <td className="td_nowarp">{item.cus_id}</td>
                    <td className="info_text">
                      <div
                        onClick={() =>
                          handleShowPopup_view(
                            item.cus_id,
                            shirt_info,
                            shirt_,
                            shirt_PE,
                            shirt_scout
                          )
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
                            Date_time,
                            Approve_by
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
                        style={{ backgroundColor: "red" }}
                      >
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
                  <strong>รายละเอียด : </strong>
                  <span>{ShirtData.info}</span>
                </p>
              </div>
              {ShirtData.shirt?.Selected && (
                <div className="Shirt-data">
                  <h6 style={{ margin: "0 0rem", textAlign: "center" }}>
                    เสื้อนักเรียน
                  </h6>
                  <div>
                    <ShirtOrder cus_id={popup_view} />
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
              )}
              {ShirtData.PE?.Selected && (
                <div className="Shirt-data">
                  <h6 style={{ margin: "0 0rem", textAlign: "center" }}>
                    เสื้อพละ
                  </h6>
                  <div>
                    <ShirtOrderPE cus_id={popup_view} />
                    {ShirtData.PE?.SName.fullname && (
                      <p>
                        <strong>ชื่อ-นามสกุล : </strong>
                        <span>{ShirtData.PE?.SName.fullname}</span>
                      </p>
                    )}
                    {ShirtData.PE?.dot.type && (
                      <p>
                        <strong>ปักเพิ่มเติม : </strong>
                        <span>{ShirtData.PE?.dot.amount_dot} </span>
                        <span>{ShirtData.PE?.dot.type} </span>
                        <span>{ShirtData.PE?.dot.position} </span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {ShirtData.scout?.Selected && (
                <div className="Shirt-data">
                  <h6 style={{ margin: "0 0rem", textAlign: "center" }}>
                    เสื้อลูกเสือ&เนตรนารี&ยุวกาชาติ
                  </h6>
                  <div>
                    <ShirtOrderScout cus_id={popup_view} />
                    {ShirtData.scout?.SName.fullname && (
                      <p>
                        <strong>ชื่อ-นามสกุล : </strong>
                        <span>{ShirtData.scout?.SName.fullname}</span>
                      </p>
                    )}
                    {ShirtData.scout?.SName && (
                      <p>
                        <strong>รูปแบบการปัก : </strong>
                        <span>
                          {(() => {
                            const [frameColor, clothColor, textColor] = [
                              ShirtData.scout.SName.color_border,
                              ShirtData.scout.SName.cloth,
                              ShirtData.scout.SName.color,
                            ];
                            const combinedValue = `${frameColor}_${clothColor}_${textColor.toLowerCase()}`;
                            let translatedText = "";
                            switch (combinedValue) {
                              case "#FCF5E5_white_blue":
                                translatedText =
                                  "กรอบสีขาว ผ้าสีขาว ชื่อสีน้ำเงิน";
                                break;
                              case "#FCF5E5_white_black":
                                translatedText = "กรอบสีขาว ผ้าสีขาว ชื่อสีดำ";
                                break;
                              case "red_lightcoral_yellow":
                                translatedText =
                                  "กรอบสีแดง ผ้าสีแดง ชื่อสีเหลือง";
                                break;
                              case "black_#36454F_yellow":
                                translatedText =
                                  "กรอบสีดำ ผ้าสีดำ ชื่อสีเหลือง";
                                break;
                              default:
                                translatedText = "Unknown combination";
                            }

                            return translatedText;
                          })()}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}
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
                <div style={{ display: "flex", gap: "1rem" }}>
                  <h2>วัน/เดือน/ปี : {PricePaid.formattedDate}</h2>
                  <h2>เวลา : {PricePaid.formattedTime}</h2>
                </div>
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
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.value1}</td>
                          <td>{item.value2}</td>
                          <td>{item.value3}</td>
                          <td>{item.value4}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tr className="sumprice">
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        ราคารวม
                      </td>
                      <td>{PricePaid.Order_sum}</td>
                    </tr>
                  </table>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    {IsPaidReturn(PricePaid.Order_paid)}
                    <span>
                      <h1>ผู้อนุมัติ : {PricePaid.Approve_by}</h1>
                    </span>
                  </div>
                </div>
                <div
                  className="print-button"
                  style={{ textAlign: "center", marginTop: "1rem" }}
                >
                  <button onClick={handlePrint}>พิมพ์</button>
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
      {showPopupStatus && (
        <SweetAlert
          success
          title="เปลี่ยนสถานะสำเร็จ"
          onConfirm={handleNo}
          onCancel={handleNo}
          confirmBtnText="ตกลง"
          confirmBtnCssClass="btn-custom"
          customClass="custom-sweetalert" // Custom class
          style={{ display: "flex", minWidth: "15rem", width: "20rem" }}
        >
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            รหัสลูกค้า : {popup_delete}
          </div>
        </SweetAlert>
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

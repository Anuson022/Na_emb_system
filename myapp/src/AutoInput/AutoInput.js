import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import yes_no_Popup from "./yes_no_Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

const ITEMS_PER_PAGE = 5;
const AutoInput = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const [Status,SetStatus] = useState()

  const [popup_delete, setpopup_delete] = useState(null);
  const [popup_view, setpopup_view] = useState({});
  const [popup_bill, setpopup_bil] = useState([]);

  const [showpopup_delete, setshowpopup_delete] = useState(false);
  const [showpopup_view, setshowpopup_view] = useState(false);
  const [showpopup_bill, setshowpopup_bill] = useState(false);

  const handleShowPopup_delete = (cus_id) => {
    setpopup_delete(cus_id);
    setshowpopup_delete(true);
  };
  const handleShowPopup_view = async (shirtInfo) => {
    await setpopup_view({ shirtInfo });
    //await console.log(popup_view.shirtInfo.SName.fullname)
    setshowpopup_view(true);
  };
  const handleShowPopup_bill = async (BillInfo) => {
    await setpopup_bil(BillInfo);
    //await console.log(popup_view.shirtInfo.SName.fullname)
    setshowpopup_bill(true);
  };
  const handleYes_delete = async () => {
    try {
      const response = await axios.post("/delete_cusdata", { popup_delete });
      setpopup_delete(response.data);
      fetching_data();
      //alert(popup_delete)
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setshowpopup_delete(false);
  };
  const handleNo = () => {
    setshowpopup_delete(false);
    setshowpopup_view(false);
  };

  const Check_verify = (verify) => {
    return verify ? "ยืนยันแล้ว" : "ยังไม่ยืนยัน";
  };
  useEffect(() => {
    fetching_data(currentPage);
  }, [currentPage]);

  const fetching_data = async (page) => {
    const search_value = "";
    const response = await axios
      .post("/search_cus2", { search_value })
      .then((response) => {
        setData(response.data);
        // Extract column headers from the data keys
        /*if (response.data.length > 0) {
          setColumns(Object.keys(response.data[0]));
        }*/
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      }).finally;
    {
    }
  };
  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    const search_value = e.target.value;
    try {
      const response = await axios.post("/search_cus2", { search_value });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const navigate = useNavigate();

  const handleClick = (cus_id, info, parent_name, phone_number, status) => {
    const cus_data = { cus_id, info, parent_name, phone_number, status };
    navigate("/test-com", { state: { cus_data } });
  };

  return (
    <div class="container_customer_table">
      <div>
        <input type="text" name="" id="" onChange={handleSearch}/>
      </div>
      <table>
        <thead className="table_head">
          <tr>
            <th>ลำดับที่</th>
            <th>รูปแบบการปัก</th>
            <th>ชื่อโรงเรียน</th>
            <th>Actions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table_body">
          {currentItems.map((item) => {
            const shirtDetails = JSON.parse(item.shirt);
            const Order_obj = JSON.parse(item.cus_order);
            const Order_sum = item.price;
            const Order_paid = item.is_paid;
            return (
              <tr key={item.cus_id}>
                <td className="td_nowarp">{item.cus_id}</td>
                <td className="td_nowarp">{item.parent_name}</td>
                <td className="td_nowarp">{item.phone_number}</td>
                {/*<td className="td_nowarp"><button class="fa fa-info" aria-hidden="true" 
             onClick={() => handleShowPopup_view(item.cus_id,item.info,item.parent_name,item.phone_number,item.status)}></button></td>*/}
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
                  >
                    Edit
                  </button>
                </td>
                <td className="td_nowarp">
                  <button onClick={() => handleShowPopup_delete(item.cus_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={indexOfLastItem >= data.length}
      >
        Next
      </button>
      {showpopup_delete && (
        <div className="popup">
          <div className="popup-inner">
            <p>Do you want to proceed? {popup_delete}</p>
            <button onClick={handleYes_delete}>Yes</button>
            <button onClick={handleNo}>No</button>
          </div>
        </div>
      )}
      {showpopup_view && (
        <div className="popup">
          <div className="popup-shirt">
            <div className="button-close">
              <button onClick={handleNo}>No</button>
            </div>
            <div className="Shirt-data">
              <div className="Name-data">
                <div>
                  ชื่อ - นามสกุล : {popup_view.shirtInfo.SName.fullname}
                </div>
                <div>ตำแหน่ง : {popup_view.shirtInfo.SName.position_n}</div>
                <div>
                  ปักใต้ชื่อ : {popup_view.shirtInfo.SUndername.under_name}
                </div>
                <div style={{ display: "flex" }}>
                  สี :
                  <div
                    style={{
                      backgroundColor: popup_view.shirtInfo.SName.color,
                    }}
                  ></div>
                </div>
              </div>
              <br />
              <div className="School1-data">
                <div>ชื่อย่อโรงเรียน : {popup_view.shirtInfo.SSchool.name}</div>
                <div>
                  ตำแหน่งโรงเรียน : {popup_view.shirtInfo.SSchool.position_s}
                </div>
                <div style={{ display: "flex" }}>
                  สี :
                  <div
                    style={{
                      backgroundColor: popup_view.shirtInfo.SSchool.color1,
                    }}
                  ></div>
                </div>
              </div>
              <br />
              <div className="School2-data">
                <div>ชื่อโลโก้ : {popup_view.shirtInfo.SLogo.school_name}</div>
                <div>
                  ตำแหน่งโลโก้ : {popup_view.shirtInfo.SLogo.position_l}
                </div>
              </div>
              <br />
              <div className="Dot-data">
                <div>ประเภทจุด : {popup_view.shirtInfo.dot.type}</div>
                <div>ตำแหน่งจุด : {popup_view.shirtInfo.dot.position}</div>
                <div>จำนวนจุด : {popup_view.shirtInfo.dot.amount_dot}</div>
                <div style={{ display: "flex" }}>
                  สี :
                  <div
                    style={{
                      backgroundColor: popup_view.shirtInfo.dot.color_dot,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showpopup_bill && (
        <div className="popup">
          <div className="popup-bill">
            <div className="button-close">
              {/*<button onClick={handleNo}>No</button>*/}
            </div>
            <div className="bill-data">
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
                  <td colSpan={4} style={{textAlign:'center'}}>ราคารวม</td>
                  <td>500 บาท</td>
                </tr>

                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AutoInput;

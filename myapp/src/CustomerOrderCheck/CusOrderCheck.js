import React, { useState, useEffect } from "react";
import "./CusOrderCheck.css";
import axios from "axios";
import ShirtBill from "./ShirtBill";

function CusOrderCheck() {
  const [data, setData] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [orderSum, setOrderSum] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [showQue, setShowQue] = useState(false);
  const [status, setStatus] = useState([]);
  const [currentQue, setCurrentQue] = useState(null);

  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleCheckQue = async () => {
    try {
      const response = await axios.post("/api/GetCusQue", { SearchData: searchData });
      const quedata = response.data;

      if (quedata === "notfound") {
        setData("notfound");
      } else {
        const orderObj = quedata.map((item) => JSON.parse(item.cus_order));
        const orderSum = quedata.map((item) => item.price);
        const status = quedata.map((item) => item.status);

        setData(quedata);
        setOrderData(orderObj);
        setOrderSum(orderSum);
        setStatus(status);

        const currentque = await axios.post("/api/GetCurrentQue");
        setCurrentQue(currentque.data["MIN(cus_id)"]);

        setShowQue(true);
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  const renderContent = () => {
    if (data === "notfound") {
      return <p>ไม่พบข้อมูล</p>;
    }

    return data.map((cus, index) => (
      <div key={cus.cus_id} className="order-section">
        <ShirtBill cus_id={cus.cus_id} />
        <h2>รายการที่สั่งซื้อ</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>ที่</th>
              <th>รายละเอียด</th>
              <th>จำนวน</th>
              <th>ราคา/หน่วย</th>
              <th>ราคา</th>
            </tr>
          </thead>
          <tbody>
            {orderData[index].map((item, itemIndex) => (
              <tr key={itemIndex}>
                <td>{item.id}</td>
                <td>{item.value1}</td>
                <td>{item.value2}</td>
                <td>{item.value3}</td>
                <td>{item.value4}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="order-summary">ราคารวม: {orderSum[index]}</div>
        <div className="status-info">สถานะ: {status[index]}</div>
        <div className="queue-info">
          <span>คิวของคุณ: {cus.cus_id}</span>
          <span>คิวปัจจุบัน: {currentQue}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="cus-order-check">
      <div className="search-section">
        <h1>ระบบเช็คคิว</h1>
        <p>โปรดกรอกเบอร์โทร</p>
        <input
          type="text"
          value={searchData}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleCheckQue} className="search-button">
          ตรวจสอบ
        </button>
      </div>
      {showQue && renderContent()}
    </div>
  );
}

export default CusOrderCheck;

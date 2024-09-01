import React, { useState, useEffect } from "react";
import "./CusOrderCheck.css";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShirtBill from "./ShirtBill";
import ShirtBill_PE from "./ShirtBill_PE";
import ShirtBill_scout from "./ShirtBill_scout";

function CusOrderCheck() {
  const [data, setData] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [orderSum, setOrderSum] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [showQue, setShowQue] = useState(false);
  const [status, setStatus] = useState([]);
  const [ParentName, setParentName] = useState([]);
  const [PhoneNumber, setPhoneNumber] = useState([]);
  const [currentQue, setCurrentQue] = useState(null);
  const [SelectShirt1,SetSelectShirt1] = useState()
  const [SelectShirt2,SetSelectShirt2] = useState()
  const [SelectShirt3,SetSelectShirt3] = useState()
  const [ShowByStatus,setShowBystatus] = useState("")
  
  const handleSearchChange = (e) => {
    setSearchData(e.target.value);
  };

  const handleCheckQue = async () => {
    try {
      const response = await axios.post("/api/GetCusQue", { SearchData: searchData });
      const quedata = response.data;
      console.log(quedata[0].shirt)
      if (quedata === "notfound") {
        setData("notfound");
        setShowQue(true);
      } else {
        const orderObj = quedata.map((item) => JSON.parse(item.cus_order));
        const orderSum = quedata.map((item) => item.price);
        const status = quedata.map((item) => item.status);
        const phone_number = quedata.map((item) => item.phone_number);
        const parent_name = quedata.map((item) => item.parent_name);
        /*const selectedshirt = quedata.map((item) => JSON.parse(item.shirt));
        const selectedPE = quedata.map((item) => JSON.parse(item.PE));
        const selectedscout = quedata.map((item) => JSON.parse(item.scout));*/
        setData(quedata);
        setOrderData(orderObj);
        setOrderSum(orderSum);
        setStatus(status);
        setPhoneNumber(phone_number)
        setParentName(parent_name)
        /*SetSelectShirt1(selectedshirt)
        SetSelectShirt2(selectedshirt)
        SetSelectShirt3(selectedshirt)
        console.log(selectedPE)*/
        const currentque = await axios.post("/api/GetCurrentQue");
        setCurrentQue(currentque.data["MIN(cus_id)"]);

        setShowQue(true);
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  const handleButtonClick = (button) => {
    if (button === 1) {
      alert(<h1>This is an H1 element</h1>);
    } else if (button === 2) {
      alert(<button>Button 2</button>);
    }
  };
  const renderContent = () => {
    if (data === "notfound") {
      return (<>
      <p>ไม่พบข้อมูลข้อมูลในสถานะนี้</p>
      <p>กรุณาเช็คเบอร์โทร</p>
      </>)
      
    }
      const settings = {
        dots: true,              // Show navigation dots
        infinite: true,          // Infinite loop
        speed: 500,              // Transition speed (ms)
        slidesToShow: 1,         // Number of slides to show
        slidesToScroll: 1,       // Number of slides to scroll at a time
        autoplay: true,          // Enable autoplay
        autoplaySpeed: 5000,     // Autoplay speed (ms)
      };
    return (
      <>
      <br />
      
      {data.map((cus, index) => (
      <div key={cus.cus_id} className="order-section">
        <div className="">
        <Slider {...settings}>
        <div>
        <ShirtBill cus_id={cus.cus_id} />
        </div>
        <div>
        <ShirtBill_PE cus_id={cus.cus_id}/>
        </div>
        <div>
        <ShirtBill_scout cus_id={cus.cus_id}/>
        </div>
        </Slider>
        
        </div>
        <h2>รายการ</h2>
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
        <div className="status-info"><span>สถานะ: {status[index]}</span> 
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',columnGap:'0rem'}} className="queue-info">
          <span>คิวของคุณ: {cus.cus_id}</span>
          <span>ชื่อผู้สั่ง: {ParentName[index]}</span>
          <span>คิวปัจจุบัน: {currentQue}</span>
          <span>เบอร์โทร :{PhoneNumber[index]}</span>
        </div>
      </div>
    ))}
    </>);
    
  };

  return (
    <>
    <header>
    <div class="container">
      <h1>ระบบเช็คคิว</h1>
    </div></header>
    <div className="cus-order-check">

      
      <div className="search-section">
        <h1>โปรดกรอกเบอร์โทร</h1>
        <div style={{display:'flex',justifyContent:'center',gap:'1rem'}}>
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

      </div>
      
      {showQue && renderContent()}
    </div>
    </>
  );
}

export default CusOrderCheck;
import React, { useState, useEffect } from "react";
import "./CusOrderCheck.css";
import axios from "axios";
import ShirtBill from "./ShirtBill";
function CusOrderCheck() {
  const [Data, SetData] = useState();
  const [OrderData, SetOrderData] = useState([]);
  const [OrderSum, SetOrderSum] = useState([]);
  const [SearchData, SetSearchData] = useState("");
  const [ShowQue, SetShowQue] = useState(false);
  const [status,setstatus] = useState()
  const IsFound = () => {
    console.log(Data);
    if (Data === "notfound") {
      return <>"notfound"</>;
    } else {
      return (
        <>
          <ShirtBill cus_id={Data[1].cus_id} />
          <div>
            <h1>รายการ</h1>
            <table>
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
                {OrderData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.value1}</td>
                    <td>{item.value2}</td>
                    <td>{item.value3}</td>
                    <td>{item.value4}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>ราคารวม {OrderSum}</div>
          </div>

          <div>Status :{status}</div>
        </>
      );
    }
  };
  const HandleSearchChange = (e) => {
    SetSearchData(e.target.value);
  };
  const HandleCheckQue = async () => {
    console.log(SearchData);
    const quedata = await axios.post("/api/GetCusQue", { SearchData });
    SetData(quedata.data);
    const Order_obj = JSON.parse(quedata.data[1].cus_order);
    const Order_sum = quedata.data[1].price
    const status = quedata.data[1].status
    setstatus(status)
    SetOrderSum(Order_sum)
    SetOrderData(Order_obj);
    SetShowQue(true);
  };

  return (
    <div>
      <div>
        <h1>ระบบเช็คคิว</h1>
        <p>โปรดกรอกเบอร์โทร</p>
        <input type="text" value={SearchData} onChange={HandleSearchChange} />
        <button onClick={HandleCheckQue}>check</button>
      </div>
      {ShowQue ? <IsFound /> : ""}
    </div>
  );
}

export default CusOrderCheck;

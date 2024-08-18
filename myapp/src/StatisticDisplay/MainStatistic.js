import React, { useState } from "react";
import './MainStatistic.css'
import WeeklyCustomerGraph from "./WeeklyCustomerGraph";
import DailyCustomerGraph from "./DailyCustomerGraph";
import MonthlyCustomerGraph from "./MonthlyCustomerGraph";
import YearlyCustomerGraph from "./YearlyCustomerGraph";
import WeeklyPriceGraph from "./Price/WeeklyPriceGraph";
import YearlyPriceGraph from "./Price/YearlyPriceGraph";
import DailyPriceGraph from "./Price/DailyPriceGraph";
import MonthlyPriceGraph from "./Price/MonthlyPriceGraph";

function MainStatistic() {
  const [GraphRange, setGraphRange] = useState("รายสัปดาห์");
  const [BarRange, setBarRange] = useState("รายสัปดาห์");

  const handleGraph = (event) => {
    setGraphRange(event.target.value);
    console.log("Selected value:", event.target.value);
  };
  const handleBar = (event) => {
    setBarRange(event.target.value);
    console.log("Selected value:", event.target.value);
  };
  return (
    <>
      <div style={{backgroundColor:'#EA6A47',color:'white',padding:'0.1rem 1rem'}}><h2>ข้อมูลเชิงสถิติ</h2></div>
      <div style={{padding:'1rem'}}>
    <div>
      <div className="Cus-statistic">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>จำนวนลูกค้าที่มาใช้บริการปักผ้า</h2>
        <div className="Select-time">
          <select id="mySelect" value={GraphRange} onChange={handleGraph}>
            <option value="รายวัน">รายวัน</option>
            <option value="รายสัปดาห์">รายสัปดาห์</option>
            <option value="รายเดือน">รายเดือน</option>
            <option value="รายปี">รายปี</option>
          </select>
        </div>
      </div>
      <div>
      {GraphRange === "รายวัน" && (
        <>
          <div>
            <DailyCustomerGraph />
          </div>
        </>
      )}
      {GraphRange === "รายสัปดาห์" && (
        <>
          <div>
            <WeeklyCustomerGraph />
          </div>
        </>
      )}
      {GraphRange === "รายเดือน" && (
        <>
          <div>
            <MonthlyCustomerGraph />
          </div>
        </>
      )}
      {GraphRange === "รายปี" && (
        <>
          <div>
            <YearlyCustomerGraph />
          </div>
        </>
      )}
      </div>
      </div>
      <div className="Price-statistic">
        <br /><br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>รายได้</h2>
        <div className="Select-time">
          <select id="mySelect" value={BarRange} onChange={handleBar}>
            <option value="รายวัน">รายวัน</option>
            <option value="รายสัปดาห์">รายสัปดาห์</option>
            <option value="รายเดือน">รายเดือน</option>
            <option value="รายปี">รายปี</option>
          </select>
        </div>
      </div>
      <div>
      {BarRange === "รายวัน" && (
        <>
          <div>
            <DailyPriceGraph/>
          </div>
        </>
      )}
      {BarRange === "รายสัปดาห์" && (
        <>
          <div>
            <WeeklyPriceGraph/>
          </div>
        </>
      )}
      {BarRange === "รายเดือน" && (
        <>
          <div>
            <MonthlyPriceGraph/>
          </div>
        </>
      )}
      {BarRange === "รายปี" && (
        <>
          <div>
            <YearlyPriceGraph/>
          </div>
        </>
      )}
      </div>
      </div>
      
      
      
      
    </div>
    </div>
    </>
  );
}

export default MainStatistic;

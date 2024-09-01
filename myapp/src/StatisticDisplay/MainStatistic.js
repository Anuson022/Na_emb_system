import React, { useState } from "react";
import "./MainStatistic.css";
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
  function CurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
  
    const formattedDate = `${day}-${month}-${year}`; // e.g., "2024-09-01"
  
    return (
      <div>
        <h1>วันนี้ : {formattedDate}</h1>
      </div>
    );
  }

  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  function CurrentMonth() {
    const today = new Date();
  
    // Get the start of the month (the 1st day of the current month)
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
    // Get the end of the month (the last day of the current month)
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
    // Format the dates
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    };
  
    return (
      <div style={{ display: "flex", gap: "1rem" }}>
      <h1>ตั้งแต่ : {formatDate(startOfMonth)}</h1>
      <h1>ถึง : {formatDate(endOfMonth)}</h1>
      </div>
    );
  }
  function CurrentYear() {
    const today = new Date();
  
    // Get the start of the year (January 1st of the current year)
    const startOfYear = new Date(today.getFullYear(), 0, 1);
  
    // Get the end of the year (December 31st of the current year)
    const endOfYear = new Date(today.getFullYear(), 11, 31);
  
    // Format the dates
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    };
  
    return (
      <div style={{ display: "flex", gap: "1rem" }}>
        <h1>ตั้งแต่ : {formatDate(startOfYear)}</h1>
        <h1>ถึง : {formatDate(endOfYear)}</h1>
      </div>
    );
  }
  return (
    <>
      <div
        style={{
          backgroundColor: "#EA6A47",
          color: "white",
          padding: "0.1rem 1rem",
        }}
      >
        <h2>ข้อมูลเชิงสถิติ</h2>
      </div>
      <div style={{ padding: "1rem" }}>
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
                <CurrentDate/>
                  <div>
                    <DailyCustomerGraph />
                  </div>
                </>
              )}
              {GraphRange === "รายสัปดาห์" && (
                <>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <h1>ตั้งแต่ : {formatDate(startOfWeek)}</h1>
                    <h1>ถึง : {formatDate(endOfWeek)}</h1>
                  </div>
                  <div>
                    <WeeklyCustomerGraph />
                  </div>
                </>
              )}
              {GraphRange === "รายเดือน" && (
                <>
                <CurrentMonth/>
                  <div>
                    <MonthlyCustomerGraph />
                  </div>
                </>
              )}
              {GraphRange === "รายปี" && (
                <>
                <CurrentYear/>
                  <div>
                    <YearlyCustomerGraph />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="Price-statistic">
            <br />
            <br />
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
                <CurrentDate/>
                  <div>
                    <DailyPriceGraph />
                  </div>
                </>
              )}
              {BarRange === "รายสัปดาห์" && (
                <>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <h1>ตั้งแต่ : {formatDate(startOfWeek)}</h1>
                    <h1>ถึง : {formatDate(endOfWeek)}</h1>
                  </div>
                  <div>
                    <WeeklyPriceGraph />
                  </div>
                </>
              )}
              {BarRange === "รายเดือน" && (
                <>
                <CurrentMonth/>
                  <div>
                    <MonthlyPriceGraph />
                  </div>
                </>
              )}
              {BarRange === "รายปี" && (
                <>
                <CurrentYear/>
                  <div>
                    <YearlyPriceGraph />
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

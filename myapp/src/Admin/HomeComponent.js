import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import styled from 'styled-components';
import './HomeComponent.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faCircleCheck, faLink, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const App = () => {
  const [chartData, setChartData] = useState(null);
  const [CountStatus, SetCountStatus] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    axios
      .get("/api/customer-status")
      .then((response) => {
        const data = response.data;

        const status = ["ยังไม่ตรวจสอบ", "กำลังดำเนินการ", "การปักเสร็จสิ้น"];
        console.log(data[0]?.count);
        console.log(data[1]?.count);
        console.log(data[2]?.count);
        SetCountStatus(data);
        console.log(data);
        const statusCounts = status.map((s) => {
          const statusData = data.find((item) => item.status === s);
          
          return statusData ? statusData.count : 0;
        });

        setChartData({
          labels: status,
          datasets: [
            {
              label: "Data Count",
              data: statusCounts, // Use the computed status counts
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const HoverDiv = styled.div
  `color:white;
    background-color: coral;
    &:hover {
      background-color: blue;
    }`;
  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>หน้าแรก</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        <div className="order-check"
          style={{
            backgroundColor: "red",
            width: "100%",
            height: "15rem",
            display: "flex",
            cursor:'pointer',
            padding:'1rem'
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <FontAwesomeIcon icon={faCheckToSlot} style={{fontSize:'10rem',color:'white'}} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{color:'white', textAlign: "center",fontSize:'5rem'}}>
            {CountStatus[0]?.count ?? 0}
            </span>
            <br />
            <span style={{color:'white', textAlign: "center",fontSize:'2rem'}}>
              ยังไม่ตรวจสอบ
            </span>
          </div>
        </div>
        <div className="order-check"
          style={{
            backgroundColor: "blue",
            width: "100%",
            height: "15rem",
            display: "flex",
            cursor:'pointer',
            padding:'1rem'
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <FontAwesomeIcon icon={faListCheck} style={{fontSize:'10rem',color:'white'}} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{color:'white', textAlign: "center",fontSize:'5rem'}}>
              {CountStatus[1]?.count ?? 0}
            </span>
            <br />
            <span style={{color:'white', textAlign: "center",fontSize:'2rem'}}>
              กำลังดำเนินการ
            </span>
          </div>
        </div>
        <div className="order-check"
          style={{
            backgroundColor: "green",
            width: "100%",
            height: "15rem",
            display: "flex",
            cursor:'pointer',
            padding:'1rem'
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <FontAwesomeIcon icon={faCircleCheck} style={{fontSize:'10rem',color:'white'}} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span style={{color:'white', textAlign: "center",fontSize:'5rem'}}>
                {CountStatus[2]?.count ?? 0}
            </span>
            <br />
            <span style={{color:'white', textAlign: "center",fontSize:'2rem'}}>
              การปักเสร็จสิ้น
            </span>
          </div>
        </div>
      </div>
      
      <br /><br />
      <div style={{ width: '1000px', height: '1000px' }}>
        <Pie data={chartData} />
      </div>
      
    </div>
  );
};

export default App;

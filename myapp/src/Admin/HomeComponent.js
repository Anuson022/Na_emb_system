import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import styled from 'styled-components';
import './HomeComponent.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faCircleCheck, faLink, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, ArcElement);
ChartJS.register(ChartDataLabels);
const App = () => {
  const [chartData, setChartData] = useState(null);
  const [CountStatus, SetCountStatus] = useState({});
  const [TimeData,SetTimeData] = useState([])

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Number of orders to show per page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const UserLimit = TimeData.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(TimeData.length / ordersPerPage);
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
                "red",
                "blue",
                "green",
              ],
              borderColor: [
                "gray",
                "gray",
                "gray",
              ],
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customerTimeStamp'); // Replace with your API endpoint
        SetTimeData(response.data);
      } catch (error) {
        console.error(error);
      }}
      fetchCustomers();
  }, []);

      
  if (!chartData) {
    return <div>Loading...</div>;
  }
// Chart options
const chartOptions = {
  plugins: {
    datalabels: {
      formatter: (value, context) => {
        const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
        const percentage = ((value / total) * 100).toFixed(2);
        return `${percentage}%`;
      },
      color: 'white',
      font: {
        size: 16,
      },
    },
    legend: {
      labels: {
        font: {
          family:'RSU_regular',
          size: 24,
          weight: 'bold'
        },
      },
    },
  },
};
  return (
    <div>
      <div style={{backgroundColor:'#D32D41',color:'white',padding:'0.1rem 1rem'}}><h2>หน้าแรก</h2></div>
      <br />
      <div className="HomeGridWarper">
      <div className="HomeGridContainer">
      
        <div className="HomeGrid">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
            }}
          >
            <FontAwesomeIcon icon={faCheckToSlot} className="HomeIcon" />
          </div>
          <div>
            <span className="HomeFont">
            {CountStatus[2]?.count ?? 0}
            </span>
            <span className="HomeFont1">
              ยังไม่ตรวจสอบ
            </span>
          </div>
        </div>
        <div className="HomeGrid"
          style={{ backgroundColor: "blue",}}>
          <div>
            <FontAwesomeIcon icon={faListCheck} className="HomeIcon" />
          </div>
          <div
          >
            <span className="HomeFont">
              {CountStatus[1]?.count ?? 0}
            </span>
            <span className="HomeFont1">
              กำลังดำเนินการ
            </span>
          </div>
        </div>
        <div className="HomeGrid"
          style={{ backgroundColor: "green",}}>
          <div>
            <FontAwesomeIcon icon={faCircleCheck} className="HomeIcon" />
          </div>
          <div>
            <span className="HomeFont">
                {CountStatus[0]?.count ?? 0}
            </span>
            <span className="HomeFont1">
              การปักเสร็จสิ้น
            </span>
          </div>
        </div>
      </div>
      </div>
      <br /><br />
      <div>

      </div>
      <div className="GridHomePie">
      <div style={{ width: '30rem'}}>
        <Pie data={chartData} options={chartOptions}/>
      </div>
      <div className="TimeTableContainer">
        
      <table className="TimeTable">
      <thead>
        <tr>
          <th>ลำดับลูกค้า</th>
          <th>ชื่อผู้สั่ง</th>
          <th>เบอร์โทร</th>
          <th>สถานะ</th>
          <th>เวลา</th>
        </tr>
      </thead>
      <tbody>
      {UserLimit.map((item, index) => (
          <tr key={index}>
            <td>{item.cus_id}</td>
            <td>{item.parent_name}</td>
            <td>{item.phone_number}</td>
            <td>{item.status}</td>
            <td>{item.date_time}</td>
          </tr>
        ))}
      </tbody>
    </table>
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

    </div>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const WeeklyDataChart = () => {
  const [chartData, setChartData] = useState(null);
  const [Data,SetData] = useState();
  useEffect(() => {
    axios
      .get("/api/weekly-price")
      .then((response) => {
        const days = [
          "จันทร์",
          "อังคาร",
          "พุธ",
          "พฤหัสบดี",
          "ศุกร์",
          "เสาร์",
          "อาทิตย์",
        ];
        const counts = response.data.map((item) => item.count);
        const not_paid = response.data.map((item) => item.not_paid);
        const paided = response.data.map((item) => item.paided);
        const totalPrices = response.data.map((item) => item.total_price);
        const data = response.data;
        const totals = data.reduce((acc, curr) => {
          acc.count += curr.count;
          acc.not_paid += curr.not_paid;
          acc.paided += curr.paided;
          acc.total_price += curr.total_price;
          return acc;
        }, { count: 0, not_paid: 0, paided: 0, total_price: 0 });
        SetData(totals)
        setChartData({
          labels: days,
          datasets: [
            {
                label: 'ยังไม่ชำระเงิน',
                data: not_paid,
                backgroundColor: '#FAA0A0',
                borderColor: '#FF0000',
                borderWidth: 1,
            },
            {
                label: 'ชำระเงินแล้ว',
                data: paided,
                backgroundColor: '#ECFFDC',
                borderColor: '#50C878',
                borderWidth: 1,
            },
            {
                label: 'รวมทั้งหมด',
                data: totalPrices,
                backgroundColor: '#F0FFFF',
                borderColor: '#6495ED',
                borderWidth: 1,
            }
        ]
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the weekly data!", error);
      });
  }, []);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <>

    <div style={{minWidth:'20rem', margin: '0 auto' }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return Number.isInteger(value) ? value : null; // Remove decimals
                },
                font: {
                  family: "RSU_regular",
                  size: 24,
                },
              },
            },
            x: {
              ticks: {
                font: {
                  family: "RSU_regular",
                  size: 24, // Adjusts the font size of the x-axis labels
                },
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  family: "RSU_regular",
                  size: 24,
                },
              },
            },
          },
        }}
        style={{ height: "40rem" }}
      />
    </div>
    <div style={{display:'flex',justifyContent:'space-around'}}>
      <h1>ราคาที่ยังไม่ชำระเงิน {Data.not_paid} บาท</h1>
      <h1>ราคาที่ชำระเงินแล้ว {Data.paided} บาท</h1>
      <h1>ราคารวมทั้งหมด {Data.total_price} บาท</h1>
    </div>
    </>
  );
};

export default WeeklyDataChart;

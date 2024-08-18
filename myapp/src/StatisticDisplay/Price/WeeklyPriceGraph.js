import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const WeeklyDataChart = () => {
  const [chartData, setChartData] = useState(null);

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
        const not_paid = response.data.map((item) => item.total_price);
        const paided = response.data.map((item) => item.paided);
        const totalPrices = response.data.map((item) => item.total_price);


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
  );
};

export default WeeklyDataChart;

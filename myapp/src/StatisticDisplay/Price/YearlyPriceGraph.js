import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const YearlyPriceChart = () => {
    const [data, setData] = useState([]);
    const [Data, SetData] = useState();
    useEffect(() => {
        axios.get('/api/yearly-price')
            .then(response => {
                setData(response.data);console.log(response.data);
                const data1 = response.data;
                const totals = data1.reduce(
                  (acc, curr) => {
                    acc.count += curr.count;
                    acc.not_paid += curr.not_paid;
                    acc.paided += curr.paided;
                    acc.total_price += curr.total_price;
                    return acc;
                  },
                  { count: 0, not_paid: 0, paided: 0, total_price: 0 }
                );
                SetData(totals);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const months = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    
    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'ยังไม่ชำระเงิน',
                data: data.map(item => item.not_paid),
                backgroundColor: '#FAA0A0',
                borderColor: '#FF0000',
                borderWidth: 1,
            },
            {
                label: 'ชำระเงินแล้ว',
                data: data.map(item => item.paided),
                backgroundColor: '#ECFFDC',
                borderColor: '#50C878',
                borderWidth: 1,
            },
            {
                label: 'รวมทั้งหมด',
                data: data.map(item => item.total_price),
                backgroundColor: '#F0FFFF',
                borderColor: '#6495ED',
                borderWidth: 1,
            }
        ]
    };

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
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1>ราคาที่ยังไม่ชำระเงิน {Data?.not_paid || 0} บาท</h1>
        <h1>ราคาที่ชำระเงินแล้ว {Data?.paided || 0} บาท</h1>
        <h1>ราคารวมทั้งหมด {Data?.total_price || 0} บาท</h1>
      </div>
    </>
    );
};

export default YearlyPriceChart;

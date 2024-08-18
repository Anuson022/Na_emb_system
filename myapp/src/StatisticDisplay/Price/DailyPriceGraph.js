import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const HourlyDataChart = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get('/api/hourly-data-today')
            .then(response => {
                console.log(response.data)
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const hours = Array.from({ length: 13 }, (_, i) => `${8 + i}:00`);

    const chartData = {
        labels: hours,
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

export default HourlyDataChart;

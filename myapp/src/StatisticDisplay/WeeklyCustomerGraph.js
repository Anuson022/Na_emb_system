import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
    const [chartData, setChartData] = useState(null);
    const [Data, SetData] = useState(0);
    useEffect(() => {
        axios.get('/api/weekly-data')
            .then(response => {
                const data = response.data;
                const daysOfWeek = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
                const data1 = response.data;
                const sum = data1.reduce((acc, curr) => acc + curr, 0);
                SetData(sum);
                setChartData({
                    labels: daysOfWeek,
                    datasets: [
                        {
                            label: 'จำนวนลูกค้า',
                            data: data, // This is the array of counts per day
                            fill: false,
                            borderColor: '#EA6A47',
                            tension: 0.1,
                            pointRadius: 5
                        }
                    ],

                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div style={{minWidth:'20rem', margin: '0 auto' }}>
            <Line data={chartData} 
        options={{
            responsive: true,
            maintainAspectRatio: false, 
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return Number.isInteger(value) ? value : null; // Remove decimals
                    },
                  font: {
                    family:'RSU_regular',
                    size: 24,

                  }
                }
              },
              x: {
                ticks: {
                  font: {                    
                    family:'RSU_regular',
                    size: 24 // Adjusts the font size of the x-axis labels
                  }
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  font: {
                    family:'RSU_regular',
                    size: 24
                  }
                }
              },
            }
          }}
          style={{ height: "40rem" }}  // Set a specific height to ensure responsiveness
            />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
        <h1>จำนวน {Data} คน</h1>
        </div>
        </>
    );
};

export default App;

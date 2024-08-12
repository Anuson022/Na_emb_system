import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('/api/weekly-data')
            .then(response => {
                const data = response.data;

                const daysOfWeek = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];

                setChartData({
                    labels: daysOfWeek,
                    datasets: [
                        {
                            label: 'จำนวนลูกค้า',
                            data: data, // This is the array of counts per day
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
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
        <div style={{minWidth:'20rem', margin: '0 auto' }}>
            <Line data={chartData} 
        options={{
            responsive: true,  // Enable responsiveness
            maintainAspectRatio: false,  // Allow the chart to fill the parent container
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return Number.isInteger(value) ? value : null; // Remove decimals
                    },
                  font: {
                    size: 24 // Adjusts the font size of the y-axis labels
                  }
                }
              },
              x: {
                ticks: {
                  font: {
                    size: 24 // Adjusts the font size of the x-axis labels
                  }
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                    
                  font: {
                    size: 26 // Adjusts the font size of the legend labels
                  }
                }
              },
              title: {
                display: true,
                text: 'รายสัปดาห์',
                font: {
                  size: 18 // Adjusts the font size of the chart title
                }
              }
            }
          }}
          style={{ height: "40rem" }}  // Set a specific height to ensure responsiveness
            />
        </div>
    );
};

export default App;

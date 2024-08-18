import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const MonthlyGraph = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('/api/monthly-data')
            .then(response => {
                const data = response.data;
                const labels = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
                
                setChartData({
                    labels: labels,
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
            .catch(error => {
                console.error('Error fetching the data', error);
            });
    }, []);

    if (!chartData) return <div>Loading...</div>;

    return (
        <div style={{minWidth:'20rem', margin: '0 auto' }}>
            <Line data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true, 
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
            style={{ height: "30rem" }}
            />
        </div>
    );
};

export default MonthlyGraph;

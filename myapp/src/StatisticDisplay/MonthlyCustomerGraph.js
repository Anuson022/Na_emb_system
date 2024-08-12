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
                            label: 'Daily Data This Month',
                            data: data,
                            fill: false,
                            borderColor: 'green',
                        }
                    ]
                });
            })
            .catch(error => {
                console.error('Error fetching the data', error);
            });
    }, []);

    if (!chartData) return <div>Loading...</div>;

    return (
        <div>
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
                                      size: 24 // Adjust font size of y-axis labels
                                  }
                              }
                          },
                          x: {
                              ticks: {
                                  font: {
                                      size: 24 // Adjust font size of x-axis labels
                                  }
                              }
                          }
                      },
                      plugins: {
                          legend: {
                              labels: {
                                  font: {
                                      size: 26 // Adjust font size of legend labels
                                  }
                              }
                          },
                          title: {
                              display: true,
                              text: 'Daily Data for This Month',
                              font: {
                                  size: 18 // Adjust font size of chart title
                              }
                          }
                      }
                  }}
                  style={{ height: "40rem" }}  // Set a specific height to ensure responsiveness
            />
        </div>
    );
};

export default MonthlyGraph;

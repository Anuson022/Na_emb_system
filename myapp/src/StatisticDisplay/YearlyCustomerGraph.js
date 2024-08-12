import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('/api/yearly-data')  // Change to the new API endpoint
            .then(response => {
                const data = response.data;

                const monthsOfYear = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];

                setChartData({
                    labels: monthsOfYear,
                    datasets: [
                        {
                            label: 'จำนวนลูกค้า',
                            data: data, // Array of counts per month
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
        <div style={{ minWidth: '20rem', margin: '0 auto' }}>
            <Line data={chartData} 
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return Number.isInteger(value) ? value : null;
                                },
                                font: {
                                    size: 24
                                }
                            }
                        },
                        x: {
                            ticks: {
                                font: {
                                    size: 24
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 26
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'รายปี',
                            font: {
                                size: 18
                            }
                        }
                    }
                }}
                style={{ height: "40rem" }}
            />
        </div>
    );
};

export default App;

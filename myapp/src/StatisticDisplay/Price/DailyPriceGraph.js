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
                label: 'Count',
                data: data.map(item => item.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y1',
            },
            {
                label: 'Total Price',
                data: data.map(item => item.total_price),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                yAxisID: 'y2',
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const datasetLabel = tooltipItem.dataset.label || '';
                        const value = tooltipItem.raw;
                        return `${datasetLabel}: ${value}`;
                    }
                }
            }
        },
        scales: {
            y1: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Count'
                },
                beginAtZero: true,
            },
            y2: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Total Price'
                },
                beginAtZero: true,
                grid: {
                    drawOnChartArea: false,
                }
            }
        }
    };

    return (
        <div>
            <h2>Hourly Data Chart</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default HourlyDataChart;

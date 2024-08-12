import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const YearlyPriceChart = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get('/api/yearly-price')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
        'September', 'October', 'November', 'December'
    ];

    const chartData = {
        labels: months,
        datasets: [{
            label: 'Total Price',
            data: data.map(item => item.total_price),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div>
            <h2>Yearly Price Chart</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default YearlyPriceChart;

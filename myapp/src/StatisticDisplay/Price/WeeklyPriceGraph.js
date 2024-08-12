import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const WeeklyDataChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('/api/weekly-price')
            .then(response => {
                const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                const counts = response.data.map(item => item.count);
                const totalPrices = response.data.map(item => item.total_price);

                setChartData({
                    labels: days,
                    datasets: [
                        {
                            label: 'Total Price',
                            data: totalPrices,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        },
                    ],
                });
            })
            .catch(error => {
                console.error("There was an error fetching the weekly data!", error);
            });
    }, []);

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Bar data={chartData} />
        </div>
    );
};

export default WeeklyDataChart;

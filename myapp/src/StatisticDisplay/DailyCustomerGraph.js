import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const HourlyGraphToday = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('/api/hourly-data-today')
            .then(response => {
                const data = response.data;
                const labels = Array.from({ length: 13 }, (_, i) => `${i + 8}:00`);
                console.log(response.data)
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Hourly Data Today (8:00 - 20:00)',
                            data: data,
                            fill: false,
                            borderColor: 'blue',
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
            <h2>Hourly Data for Today (8:00 AM - 8:00 PM)</h2>
            <Line data={chartData} />
        </div>
    );
};

export default HourlyGraphToday;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/weekly-data')
            .then(response => {
                const data = response.data;

                const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

                setChartData({
                    labels: daysOfWeek,
                    datasets: [
                        {
                            label: 'Data Count',
                            data: data, // This is the array of counts per day
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                            pointRadius: 5
                        }
                    ]
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Weekly Data Chart (Monday to Sunday)</h2>
            <Line data={chartData} />
        </div>
    );
};

export default App;

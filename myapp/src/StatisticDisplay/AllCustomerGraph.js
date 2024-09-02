import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MonthlyGraph = () => {
    /*const [monthlyTotal, setMonthlyTotal] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/monthly-data-sum')
            .then(response => {
                const data = response.data;
                setMonthlyTotal(data.monthlyTotal);
            })
            .catch(error => {
                console.error('Error fetching the data', error);
            });
    }, []);

    if (monthlyTotal === null) return <div>Loading...</div>;

    return (
        <div>
            <h2>Total Data for This Month: {monthlyTotal}</h2>
        </div>
    );*/
};

export default MonthlyGraph;

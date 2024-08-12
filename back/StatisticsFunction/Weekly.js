// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

fetchRouter.get('/api/weekly-data', (req, res) => {
    const query = `
        SELECT DAYOFWEEK(date_time) AS day_of_week, COUNT(*) AS count
        FROM customer_data
        WHERE date_time >= CURDATE() - INTERVAL WEEKDAY(CURDATE()) + 6 DAY
        GROUP BY DAYOFWEEK(date_time)
        ORDER BY day_of_week;
    `;

    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // Fill in missing days with zero counts
        const weeklyData = Array(7).fill(0);
        results.forEach(row => {
            // Adjust for MySQL's 1-indexed days, where 1 = Sunday
            const adjustedDay = row.day_of_week === 1 ? 7 : row.day_of_week - 1;
            weeklyData[adjustedDay - 1] = row.count;
        });
        console.log(weeklyData)
        res.json(weeklyData);
    });
});

module.exports = fetchRouter;
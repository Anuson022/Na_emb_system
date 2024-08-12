// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

fetchRouter.get('/api/yearly-data', (req, res) => {
    const year = new Date().getFullYear();
    pool.query(
        `SELECT MONTH(date_time) as month, COUNT(*) as count FROM customer_data WHERE YEAR(date_time) = ? GROUP BY MONTH(date_time)`,
        [year],
        (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Database query failed' });
                return;
            }
            const data = Array(12).fill(0);
            results.forEach(row => {
                data[row.month - 1] = row.count;
            });
            res.json(data);
            console.log(results)
        }
    );
});
// API to get the sum of data for the current year
fetchRouter.get('/api/yearly-sum', (req, res) => {
    const year = new Date().getFullYear();

    pool.query(
        `SELECT COUNT(*) as total FROM customer_data WHERE YEAR(date_time) = ?`,
        [year],
        (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Database query failed' });
                return;
            }
            const total = results[0].total;
            res.json({ total });
        }
    );
});

// Route to fetch daily data for the current month
fetchRouter.get('/api/monthly-data', (req, res) => {
    const query = `
        SELECT DAY(date_time) AS day_of_month, COUNT(*) AS count
        FROM customer_data
        WHERE date_time >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
          AND date_time < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01')
        GROUP BY DAY(date_time)
        ORDER BY day_of_month;
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: error.message });
        }

        // Prepare data for the frontend
        const monthlyData = Array(31).fill(0); // Assuming up to 31 days in the month
        results.forEach(row => {
            monthlyData[row.day_of_month - 1] = row.count;
        });

        res.json(monthlyData);
    });
});
// Route to fetch hourly data for today
fetchRouter.get('/api/monthly-data-sum', (req, res) => {
    const query = `
        SELECT SUM(count) AS monthly_total
        FROM (
            SELECT COUNT(*) AS count
            FROM customer_data
            WHERE date_time >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
              AND date_time < DATE_FORMAT(CURDATE() + INTERVAL 1 MONTH, '%Y-%m-01')
            GROUP BY DAY(date_time)
        ) AS daily_counts;
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: error.message });
        }

        const monthlyTotal = results[0].monthly_total || 0;
        res.json({ monthlyTotal });
    });
});

fetchRouter.get('/api/weekly-data', (req, res) => {
    const query = `
        SELECT DAYOFWEEK(date_time) AS day_of_week, COUNT(*) AS count
        FROM customer_data
        WHERE date_time >= CURDATE() - INTERVAL WEEKDAY(CURDATE()) + 6 DAY
        GROUP BY DAYOFWEEK(date_time)
        ORDER BY day_of_week;`;

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
        res.json(weeklyData);
    });
});
// Route to fetch the sum of daily data for the current week
fetchRouter.get('/api/weekly-data-sum', (req, res) => {
    const query = `
        SELECT SUM(count) AS weekly_total
        FROM (
            SELECT COUNT(*) AS count
            FROM customer_data
            WHERE WEEK(date_time, 1) = WEEK(CURDATE(), 1)
              AND YEAR(date_time) = YEAR(CURDATE())
            GROUP BY DAY(date_time)
        ) AS daily_counts;
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: error.message });
        }

        const weeklyTotal = results[0].weekly_total || 0;
        res.json({ weeklyTotal });
    });
});

// Route to fetch hourly data for today
fetchRouter.get('/api/hourly-data-today', (req, res) => {
    const query = `
        SELECT HOUR(date_time) AS hour, COUNT(*) AS count
        FROM customer_data
        WHERE date_time >= CURDATE() AND date_time < CURDATE() + INTERVAL 1 DAY
        GROUP BY HOUR(date_time)
        ORDER BY hour;
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: error.message });
        }

        // Prepare data for the frontend
        const hourlyData = Array(13).fill(0); // Assuming 8:00 to 20:00 (13 hours)
        results.forEach(row => {
            if (row.hour >= 8 && row.hour < 21) {
                hourlyData[row.hour - 8] = row.count;
            }
        });
        res.json(hourlyData);
    });
});
// Route to fetch the sum of data for today
fetchRouter.get('/api/today-data-sum', (req, res) => {
    const query = `
        SELECT COUNT(*) AS today_total
        FROM customer_data
        WHERE DATE(date_time) = CURDATE();
    `;

    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: error.message });
        }

        const todayTotal = results[0].today_total || 0;
        res.json({ todayTotal });
    });
});






module.exports = fetchRouter;
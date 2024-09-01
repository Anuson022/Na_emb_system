// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

fetchRouter.get('/api/yearly-price', (req, res) => {
    const query = `
        SELECT MONTH(date_time) AS month, COUNT(*) AS count,       
        SUM(IF(is_paid = false, price, 0)) AS not_paid,
        SUM(IF(is_paid = true, price, 0)) AS paided,
        SUM(price) AS total_price
        FROM customer_data
        WHERE YEAR(date_time) = YEAR(CURDATE())
        GROUP BY MONTH(date_time)
        ORDER BY month;`;

    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        // Initialize an array for 12 months
        const yearlyData = Array(12).fill({ count: 0,not_paid:0,paided:0, total_price: 0 });
        results.forEach(row => {
            yearlyData[row.month - 1] = { count: row.count, not_paid:row.not_paid, paided:row.paided, total_price: row.total_price };
        });

        res.json(yearlyData);
    });
});
// Route to fetch daily data and total price for the current month
fetchRouter.get('/api/monthly-price', (req, res) => {
  const query = `
  SELECT 
      DAY(date_time) AS day_of_month, 
      COUNT(*) AS count, 
      SUM(IF(is_paid = false, price, 0)) AS not_paid,
      SUM(IF(is_paid = true, price, 0)) AS paided,
      SUM(price) AS total_price
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
        const monthlyData = Array.from({ length: 31 }, () => ({ count: 0,not_paid:0,paided:0, total_price: 0 })); // Assuming up to 31 days in the month
        results.forEach(row => {
            monthlyData[row.day_of_month - 1] = 
            { count: row.count, not_paid:row.not_paid, paided:row.paided, total_price: row.total_price };
        });
        res.json(monthlyData);
    });
});

fetchRouter.get('/api/weekly-price', (req, res) => {
    const query = `
        SELECT DAYOFWEEK(date_time) AS day_of_week, COUNT(*) AS count, 
      SUM(IF(is_paid = false, price, 0)) AS not_paid,
      SUM(IF(is_paid = true, price, 0)) AS paided,
      SUM(price) AS total_price
        FROM customer_data
        WHERE date_time >= CURDATE() - INTERVAL WEEKDAY(CURDATE()) + 0 DAY
        GROUP BY DAYOFWEEK(date_time)
        ORDER BY day_of_week;`;

    pool.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        const weeklyData = Array(7).fill({ count: 0,not_paid:0,paided:0, total_price: 0 });
        results.forEach(row => {
            const adjustedDay = row.day_of_week === 1 ? 7 : row.day_of_week - 1;
            weeklyData[adjustedDay - 1] = { count: row.count, not_paid:row.not_paid, paided:row.paided, total_price: row.total_price };
        });
        console.log(weeklyData)
        res.json(weeklyData);
        
    });
});

// Route to fetch hourly data and total price for today
fetchRouter.get('/api/hourly-price', (req, res) => {
    const query = `
        SELECT HOUR(date_time) AS hour, COUNT(*) AS count,
              SUM(IF(is_paid = false, price, 0)) AS not_paid,
      SUM(IF(is_paid = true, price, 0)) AS paided,
      SUM(price) AS total_price
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
        const hourlyData = Array.from({ length: 13 }, () => ({ count: 0,not_paid:0,paided:0, total_price: 0 }));
        results.forEach(row => {
            if (row.hour >= 8 && row.hour < 21) {
                hourlyData[row.hour - 8] = { count: row.count, not_paid:row.not_paid, paided:row.paided, total_price: row.total_price };
            }
        });
        res.json(hourlyData);
    });
});


// Utility function to get start of a time range
const getTimeRangeStart = (unit) => {
  const now = new Date();
  switch (unit) {
    case 'hour':
      now.setMinutes(0, 0, 0);
      break;
    case 'day':
      now.setHours(0, 0, 0, 0);
      break;
    case 'week':
      now.setDate(now.getDate() - now.getDay());
      now.setHours(0, 0, 0, 0);
      break;
    case 'month':
      now.setDate(1);
      now.setHours(0, 0, 0, 0);
      break;
    case 'year':
      now.setMonth(0, 1);
      now.setHours(0, 0, 0, 0);
      break;
    default:
      break;
  }
  return Math.floor(now.getTime() / 1000);
};

// Route to get sum of price for current hour
fetchRouter.get('/api/sum/hourly', (req, res) => {
  const startOfHour = getTimeRangeStart('hour');
  pool.query('SELECT SUM(price) AS total FROM customer_data WHERE date_time >= ?', [startOfHour], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Route to get sum of price for current week
fetchRouter.get('/api/sum/weekly', (req, res) => {
  const startOfWeek = getTimeRangeStart('week');
  pool.query('SELECT SUM(price) AS total FROM customer_data WHERE date_time >= ?', [startOfWeek], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Route to get sum of price for current month
fetchRouter.get('/api/sum/monthly', (req, res) => {
  const startOfMonth = getTimeRangeStart('month');
  pool.query('SELECT SUM(price) AS total FROM customer_data WHERE date_time >= ?', [startOfMonth], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Route to get sum of price for current year
fetchRouter.get('/api/sum/yearly', (req, res) => {
  const startOfYear = getTimeRangeStart('year');
  pool.query('SELECT SUM(price) AS total FROM customer_data WHERE date_time >= ?', [startOfYear], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});



module.exports = fetchRouter;
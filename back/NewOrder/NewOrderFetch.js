// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

fetchRouter.post('/api/NewOrder',(req,res)=>
    {
    const SearchOrder = "SELECT * FROM customer_data WHERE status = 'ยังไม่ตรวจสอบ'"    
        try {
            pool.query(SearchOrder,(err,results)=>
                {
                    if (err)
                        {console.log(err)}
                    if (results.length === 0)
                        {
                            console.log("not found")
                            return res.send(null)
                        }
                    console.log('tes')
                    res.json(results);
                })
        } catch (error) 
        {
            console.log("not found")
        }
    })
fetchRouter.get('/api/customer-status', (req, res) => {
  const query = 'SELECT status, COUNT(*) as count FROM customer_data GROUP BY status';
  pool.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

module.exports = fetchRouter;
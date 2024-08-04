// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

fetchRouter.post('/api/GetCurrentQue',(req,res)=>
    {
         const SearchQue = "SELECT MIN(cus_id) FROM customer_data WHERE status = 'กำลังดำเนินการ'"
         try {
            pool.query(SearchQue,(err,results)=>
                {
                    if (err)
                        {console.log(err)}
                    if (results.length === 0)
                        {
                            console.log("not found")
                            return res.send("notfound")
                        }
                    res.json(results[0]);

                })
        } catch (error) 
        {
            console.log("not found")
        }
    })

module.exports = fetchRouter;
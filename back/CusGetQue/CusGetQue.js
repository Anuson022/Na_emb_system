// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

fetchRouter.post('/api/GetCusQue',(req,res)=>
    {
        const data = req.body.SearchData
        console.log(data)
         const SearchQue = "SELECT * FROM customer_data WHERE phone_number = ?"
        try {
            pool.query(SearchQue,[data],(err,results)=>
                {
                    if (err)
                        {console.log(err)}
                    if (results.length === 0)
                        {
                            console.log("not found")
                            return res.send("notfound")
                        }
                    res.json(results);
                })
        } catch (error) 
        {
            console.log("not found")
        }
    })

module.exports = fetchRouter;
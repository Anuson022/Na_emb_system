// fetchFiles.js
const express = require('express');
const pool = require('../na_db'); // Adjust the path as necessary

const fetchRouter = express.Router();

fetchRouter.post('/api/GetCusQue', (req, res) => {
    const data = req.body.SearchData;
    console.log(data);

    // Correctly define the SQL query string without double quotes or a trailing semicolon
    const SearchQue = "SELECT * FROM customer_data WHERE phone_number = ? AND (status = 'กำลังดำเนินการ' OR status = 'การปักเสร็จสิ้น')";

    try {
        pool.query(SearchQue, [data], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error executing query");
            }

            if (results.length === 0) {
                console.log("not found");
                return res.send("notfound");
            }

            res.json(results);
        });
    } catch (error) {
        console.log("An error occurred", error);
        return res.status(500).send("An error occurred");
    }
});

fetchRouter.post('/api/GetCusQue_Finished',(req,res)=>
    {
        const data = req.body.SearchData
        console.log(data)
         const SearchQue = "SELECT * FROM customer_data WHERE phone_number = ? AND status = 'การปักเสร็จสิ้น'"
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
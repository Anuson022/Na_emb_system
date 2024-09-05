import React, { useEffect, useState } from "react";
import "./ShirtPreview.css";
import axios from "axios";
import Swal from "sweetalert2";



function ShirtPreview() {


    const [ credit, setCredit ] = useState("รอเครดิตก่อนงับ");

    useEffect(()=>
    {
        loadCredit();
    }, []);
    
    
    const loadCredit = async () => 
        {
        try
        {
    
            const response = await axios.get("/api_pollmaster/credit.txt");
            setCredit(response?.data);
        }
        catch (err)
        {
            return console.error(err);
        }
    }


    return (
        <>
            <div className="myText">{ credit }</div>
        </>
    );
}

export default ShirtPreview;
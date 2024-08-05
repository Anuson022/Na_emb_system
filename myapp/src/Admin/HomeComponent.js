import React, { useEffect, useState } from 'react';
import axios from 'axios';

// const URL = "";

function HomeComponent() {

    const [ data, setData ] = useState();
    const [ is_load_data, setIsLoadData ] = useState();


    const loadData = () => 
    {
        if (is_load_data)
            return 0;

        return axios({
            url: "/search_cus3",
            method: "POST",
            data: { "search_value": "" }
        }).then((response) => {

            console.log("I'm here => ");
            console.log(response);

            setData(response.data);
            setIsLoadData(true);

            return 0;

        }).catch((err) => {
            return console.error(err);
        });
    }
    

    useEffect(() => {
        setIsLoadData(false);
        loadData();
    }, []);


    return (
        <div>HomeComponent</div>
    )
}

export default HomeComponent
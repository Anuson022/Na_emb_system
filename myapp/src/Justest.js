import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Justest() {
    const call_news = async() =>
        {
            try {
                const response = await axios.get("/api/google_news")
                console.log(response)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
            

        }
    useEffect(()=>
        {
            call_news()
        })
  return (
    <div>Justest</div>
  )
}

export default Justest
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function UserDelete({ID}) {
   useEffect(()=>
    {
        console.log(ID)
    })
  return (
    <div style={{backgroundColor:"red"}}>{ID}</div>
  )
}

export default UserDelete
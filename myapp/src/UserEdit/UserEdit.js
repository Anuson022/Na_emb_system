import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function UserEdit() {
   const Edit_data = useLocation()
   const {UserID} = Edit_data.state
   useEffect(()=>
    {
        console.log(UserID)
    })
  return (
    <div>{UserID}</div>
  )
}

export default UserEdit
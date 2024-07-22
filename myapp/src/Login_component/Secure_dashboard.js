import React from 'react'
import Admin_dashboard from '../Admin_dashboard'
import { Navigate } from 'react-router-dom'
import useAuth from './useAuth'

function Secure_dashboard() {
    const IsAuth = useAuth()
    return IsAuth ? <Admin_dashboard/> : <Navigate to="/login"/>
}

export default Secure_dashboard
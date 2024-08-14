import React from 'react'
import Admin_dashboard from '../Admin_dashboard'
import { Navigate } from 'react-router-dom'
import useAuth from './useAuth'

function Secure_component({Page}) {
    const IsAuth = useAuth()
    return IsAuth ? Page : <Navigate to="/login"/>
}

export default Secure_component
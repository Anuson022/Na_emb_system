import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Student_form from './Student_form'
import Customer_table from './Customer_table/CusTable_Recheck'
import './App.css'


function App() {

  const navigate = useNavigate();

  useEffect(()=>
    {
      navigate('/Na-Karn-puk');
    })
  
  
  return (
    <Student_form/>
  )
}

export default App
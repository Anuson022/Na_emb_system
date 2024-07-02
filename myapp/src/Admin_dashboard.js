import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Admin_dashboard.css'
import Customer_table from './Customer_table';
function Admin_dashboard() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
      }, []);
    return (
        <div>
        <nav className="navbar_header">
            <div className="navbar-logo"><h3>ระบบร้าน Na การปัก ยินดีต้อนรับ{' user... '}</h3></div>
            <div className='profile'>
                <img src="image_folder/shirt.png" alt="" /> 
                <a href="#home"><button>Logout</button></a>
            </div>
        </nav>
        <br />
        <nav className='main_dash'>
        
        <div className="sidebar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/Admin_dashboard">Admin Dashboard</Link></li>
          <li><Link to="/Admin_dashboard/Customer_table">Customer Table</Link></li>
          <li><Link to="custom_input">Custom Input</Link></li>
          <li><Link to="idk">Student Form</Link></li>
          <li><Link to="test-com">Textarea To Paragraphs</Link></li>
          <li><Link to="test-image">Image Input</Link></li>
        </ul>
        <div className='select_function'>
        <Outlet/>
        </div>
        </div>

        
        </nav>
        
        </div>
    );
}

export default Admin_dashboard

/*        <nav className="navbar">
            <div className="navbar-logo"><h3>ระบบร้าน Na การปัก ยินดีต้อนรับ{' user... '}</h3></div>
            <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <a href="#home"><button>Logout</button></a>
                <a href="#contact">Contact</a>
            </div>
            <div className="navbar-toggle" onClick={toggleNavbar}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>*/
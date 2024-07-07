import React, { useEffect, useState } from 'react';
import { Link, Outlet,useLocation } from 'react-router-dom';
import './Admin_dashboard.css'
import Customer_table from './Customer_table';
function Admin_dashboard() {
    const [sideNavOpen, setSideNavOpen] = useState(true);
    const location = useLocation();

    const toggleNav = () => {
      setSideNavOpen(!sideNavOpen);
    };

    useEffect(() => {
        const handleClick = () => {
            const displayFunctionDiv = document.querySelector('.display_function');
            if (displayFunctionDiv) {
                displayFunctionDiv.classList.add('fade-out');
            }
        };

        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', handleClick);
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener('click', handleClick);
            });
        };
    }, [location]);

    useEffect(() => {
        const displayFunctionDiv = document.querySelector('.display_function');
        if (displayFunctionDiv) {
            displayFunctionDiv.classList.remove('fade-out');
        }
    }, [location.pathname]);
    return (
        <div>
        <nav className="navbar_header">
            <div className="navbar-logo"><h3>ระบบร้าน Na การปัก ยินดีต้อนรับ{' user... '}</h3></div>
            <div className='profile'>
                <img src="/image_folder/shirt.png" alt="" />
                <a href="#home"><button>Logout</button></a>
                
            </div>
        </nav>
        <br />
        <nav className='main_dash'>
        <div className='sidebar_button'>
        <p style={{ fontSize: 20, cursor: 'pointer' }} onClick={toggleNav}>
          {sideNavOpen ? '\u2715 close' : '\u2630 open'}
        </p>
        <div className={sideNavOpen ? 'sidebar' : 'sidebar_close'}>
            <ul>
            <li><Link to="/Admin_dashboard">หน้าแรก</Link></li>
            <li><p>จัดการข้อมูลลูกค้า</p></li>
            <li><Link to="/Admin_dashboard/Customer_table">ที่ต้องตรวจสอบ</Link></li>
            <li><Link to="/Admin_dashboard/custom_input">ที่ต้องดำเนินการ</Link></li>
            <li><Link to="/Admin_dashboard/custom_input">กำลังดำเนินการ</Link></li>
            <li><Link to="/Admin_dashboard/Test1">รายการที่เสร็จสิ้น</Link></li>
            <li><Link to="/Admin_dashboard/Test1">ข้อมูลลูกค้าทั้งหมด</Link></li>

            <li><p>จัดการข้อมูลพนักงาน</p></li>
            <li><Link to="/Admin_dashboard/custom_input">ข้อมูลพนักงาน</Link></li>

            <li><p>อื่นๆ</p></li>
            <li><Link to="/Admin_dashboard/custom_input">ข้อมูลรายได้</Link></li>

            <li><Link to="/Admin_dashboard/custom_input">อัพโหลดรูปภาพโลโก้</Link></li>
            </ul>
        </div>
        </div>





        <div className='display_function'>
        <Outlet/>
        </div>

        
        </nav>
        
        </div>
    );
}

export default Admin_dashboard
/*
<ul>
<li><Link to="/">Home</Link></li>
<li><Link to="/Admin_dashboard">Admin Dashboard</Link></li>
<li><Link to="/Admin_dashboard/Customer_table">Customer Table</Link></li>
<li><Link to="/Admin_dashboard/custom_input">Custom Input</Link></li>
<li><Link to="/Admin_dashboard/Test1">Student Form</Link></li>
<li><Link to="test-com">Textarea To Paragraphs</Link></li>
<li><Link to="test-image">Image Input</Link></li>
</ul>
*/
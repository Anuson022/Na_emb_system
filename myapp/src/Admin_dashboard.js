import React, { useEffect, useState } from 'react';
import { Link, Outlet,useLocation } from 'react-router-dom';
import './Admin_dashboard.css'
import Customer_table from './Customer_table/CusTable_Recheck';
function Admin_dashboard() {
    const [sideNavOpen, setSideNavOpen] = useState(true);
    const location = useLocation();
    const Token = localStorage.getItem("token");
    const UserData = JSON.parse(localStorage.getItem("UserData"));
    const toggleNav = () => {
      setSideNavOpen(!sideNavOpen);
    };

    useEffect(()=>
        {
            if(UserData === null || UserData === undefined 
                || UserData.password === undefined)
                {
                    try {
                        localStorage.clear();
                      } catch (error) {
                        console.error(error);
                      }
                    window.location.reload();
                }
        },[location,UserData])
/*    useEffect(() => {
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
    }, [location.pathname]);*/
    return (
        <div>
        <nav className="navbar_header">
        <img src="/General_image/Na_logo.png" alt="" />
            <div className="navbar-logo"><h3>ระบบร้าน Na การปัก ยินดีต้อนรับ {UserData.role}</h3></div>
        </nav>
        <br />
        <nav className='main_dash'>
        <div className='sidebar_button'>
        <div className='profile'>
        <img src="/General_image/Na_logo.png" alt="" />
            <p>{UserData.username}</p>
        </div>
        <p className='close-open' onClick={toggleNav}>
          {sideNavOpen ? '\u2715 '+" Close " : '\u2630'+" Open "}
        </p>
        <div className={sideNavOpen ? 'sidebar' : 'sidebar_close'}>
        <h3>หน้าแรก</h3>
        <h3>จัดการข้อมูลลูกค้า</h3>
        <p><Link to="/Admin_dashboard/RecheckTable">ที่ต้องตรวจสอบ</Link></p>
        
        <p><Link to="/Admin_dashboard/CustomerTable">ที่ต้องดำเนินการ</Link></p>
        <p>รายการที่เสร็จสิ้น</p>
        <h3>จัดการข้อมูลพนักงาน</h3>
        <p><Link to="/Admin_dashboard/User_edit">ข้อมูลพนักงาน</Link></p>
        <h3>อื่นๆ</h3>
        <p>ข้อมูลรายได้</p>
        <p><Link to="/Admin_dashboard/Image_edit">อัพโหลดรูปภาพโลโก้</Link></p>
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
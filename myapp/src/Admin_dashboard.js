import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCaretDown,faChartPie,faCheckToSlot,faFilePen,faHouse, faUserGear } from "@fortawesome/free-solid-svg-icons";
import "./Admin_dashboard.css";
import Customer_table from "./Customer_table/CusTable_Recheck";
import ShirtOrder from "./Customer_table/ShirtOrder";
function Admin_dashboard() {
  const [sideNavOpen, setSideNavOpen] = useState(true);
  const [sideFullOpen, setSideFullOpen] = useState(true);
  const [SideCusTable, SetSideCusTable] = useState(true);

  const location = useLocation();
  const Token = localStorage.getItem("token");
  const UserData = JSON.parse(localStorage.getItem("UserData"));
  const Logoutnavigate = useNavigate();
  const toggleNav = () => {
    setSideNavOpen(!sideNavOpen);
  };
  const toggleFull = () => {
    setSideFullOpen(!sideFullOpen);
  };
  useEffect(() => {
    if (
      UserData === null ||
      UserData === undefined ||
      UserData.password === undefined
    ) {
      try {
        localStorage.clear();
      } catch (error) {
        console.error(error);
      }
      window.location.reload();
    }
  }, [location, UserData]);

  const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="accordion">
        <div className="accordion-header" onClick={toggleAccordion}>
        <div className="div-awesome">
            <FontAwesomeIcon icon={faFilePen} />
            <h3>จัดการข้อมูลลูกค้า</h3>
            
            {isOpen ? (
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ fontSize: "2rem", rotate: "180deg" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faCaretDown}
                style={{ fontSize: "2rem" }}
              />
            )}
            </div>
        </div>

        {isOpen && <div className="accordion-content">
          <div className="div-cus-dit">
            <p>
              <Link to="/Admin_dashboard/RecheckTable">ที่ต้องตรวจสอบ</Link>
            </p>

            <p>
              <Link to="/Admin_dashboard/CustomerTable">ที่ต้องดำเนินการ</Link>
            </p>
            <p>
              <Link to="/Admin_dashboard/FinishedTable">รายการที่เสร็จสิ้น</Link>
            </p>
            </div>
          </div>}
      </div>
    );
  };
  const HandleLogout = () => {
    localStorage.clear();
    Logoutnavigate("/login");
  };
  const navbarButton = {
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'White', // Button background color
      color: 'Black', // Text color
      padding: '10px 20px', // Padding around the button
      borderRadius: '5px', // Rounded corners
      cursor: 'pointer', // Pointer cursor on hover
      transition: 'background-color 0.3s ease', // Smooth transition on hover
      marginTop:'-2rem',
      marginBottom:'-1rem',
    },
    icon: {
      marginRight: '10px', // Space between the icon and text
      fontSize: '18px', // Size of the icon
    },
    text: {
      fontSize: '16px', // Size of the text
      fontWeight: 'bold', // Make the text bold
    },
  };
  return (
    <div>
      <nav className="navbar_header">
        <img src="/General_image/Na_logo.png" alt="" />
        <div className="navbar-logo">
          <h3>ระบบร้าน Na การปัก ยินดีต้อนรับ {UserData.role}</h3>
        </div>
      </nav>
      <br />
      <p className="close-open-full" onClick={toggleFull}>
            {sideFullOpen ? <div style={navbarButton.buttonContainer}>
              <FontAwesomeIcon icon={faBars} style={navbarButton.icon}/> 
            <div>Close</div></div>:
            <div style={navbarButton.buttonContainer}>
              <FontAwesomeIcon icon={faBars} style={navbarButton.icon}/> 
            <div>Open</div></div>}
      </p>
      <nav className={sideFullOpen ? "main_dash":"maindash-full"}>
        
        <div className={sideFullOpen ? "sidebar_button" : "hidden"}>
          <div className="profile">
            <img src={`/profile/${UserData.profile.split("/").pop()}`} alt="" />
            <p>{UserData.username}</p>
            <button className="logout-button" onClick={HandleLogout}>Logout</button>
          </div>
          
          <p className="close-open" onClick={toggleNav}>
            {sideNavOpen ? "\u2715 " + " Close " : "\u2630" + " Open "}
          </p>
          <div className={sideNavOpen ? "sidebar" : "sidebar_close"}>
            <div className="div-awesome">
            <FontAwesomeIcon icon={faHouse} />
            <h3>
            <Link to="/Admin_dashboard">
                หน้าแรก
              </Link>
            </h3>
            </div>

            <div className="div-awesome">
            <FontAwesomeIcon icon={faCheckToSlot} />
            <h3>
              <Link to="/Admin_dashboard/ApproveOrder">
                อนุมัติออเดอร์
              </Link>
            </h3>
            </div>
            

            <Accordion/>
            
            {(UserData.role === "manager") &&
              <>
            <div className="div-awesome">
            <FontAwesomeIcon icon={faUserGear} />
            <Link to="/Admin_dashboard/User_edit">
            <h3>จัดการข้อมูลพนักงาน</h3>
            </Link>
            </div>

            <div className="div-awesome">
            <FontAwesomeIcon icon={faChartPie} />
            <Link to="/Admin_dashboard/Statistic-data">
            <h3>ข้อมูลเชิงสถิติ</h3>
            </Link>
            </div>

            <h3>อื่นๆ</h3>
            
            <p>
              <Link to="/Admin_dashboard/Image_edit">อัพโหลดรูปภาพโลโก้</Link>
            </p>
            <p>
              <Link to="/Admin_dashboard/autoinput">
                ข้อมูลการปักของโรงเรียน
              </Link>
            </p>
            </>}
          </div>
        </div>

        <div className="display_function">
          <Outlet />
        </div>
      </nav>
    </div>
  );
}

export default Admin_dashboard;
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
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCaretDown,
  faChartPie,
  faCheckToSlot,
  faFileImage,
  faFilePen,
  faHouse,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import "./Admin_dashboard.css";
import Customer_table from "./Customer_table/CusTable_Recheck";
import ShirtOrder from "./Customer_table/ShirtOrder";
function Admin_dashboard() {
  const [sideNavOpen, setSideNavOpen] = useState(true);
  const [sideFullOpen, setSideFullOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const HandleSelectClassChange = (item) =>{setSelectedItem(item)}
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
      <div className="accordion" onClick={toggleAccordion}>
        <div className="div-awesome1">
          <div className="accordion-header" >
            <FontAwesomeIcon icon={faFilePen} style={{ marginLeft: "1rem" }} />
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

        {isOpen && (
          <div className="accordion-content">
            <div className="div-cus-dit" >
            <Link to="/Admin_dashboard/CustomerTable">
              <p>ที่ต้องดำเนินการ</p>
              </Link>
              <Link to="/Admin_dashboard/FinishedTable">
              <p>รายการที่เสร็จสิ้น</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };
  const HandleLogout = () => {
    localStorage.clear();
    Logoutnavigate("/login");
  };
  const navbarButton = {
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "White", // Button background color
      color: "Black", // Text color
      padding: "10px 20px", // Padding around the button
      borderRadius: "5px", // Rounded corners
      transition: "background-color 0.3s ease", // Smooth transition on hover
      marginTop: "-2rem",
      marginBottom: "-1rem",
    },
    icon: {
      marginRight: "10px", // Space between the icon and text
      fontSize: "3rem", // Size of the icon
      cursor: "pointer", // Pointer cursor on hover
    },
    text: {
      fontSize: "2rem", // Size of the text
      fontWeight: "bold", // Make the text bold
      cursor: "pointer", // Pointer cursor on hover
    },
  };

  return (
    <div className="Main-Dashboard">
      <nav className="navbar_header">
        <img src="/General_image/Na_logo.png" alt="" />
        <div className="navbar-logo">
          <h3>ระบบร้าน Na การปัก ยินดีต้อนรับ {UserData.role}</h3>
        </div>
      </nav>
      <br />
      <p className="close-open-full">
        {sideFullOpen ? (
          <div style={navbarButton.buttonContainer}>
            <FontAwesomeIcon
              icon={faBars}
              style={navbarButton.icon}
              onClick={toggleFull}
            />
            <div onClick={toggleFull} style={navbarButton.text}>
              Close
            </div>
          </div>
        ) : (
          <div style={navbarButton.buttonContainer}>
            <FontAwesomeIcon
              icon={faBars}
              style={navbarButton.icon}
              onClick={toggleFull}
            />
            <div style={navbarButton.text} onClick={toggleFull}>
              Open
            </div>
          </div>
        )}
      </p>
      <nav className={sideFullOpen ? "main_dash" : "maindash-full"}>
        <div className={sideFullOpen ? "sidebar_button" : "hidden"}>
          <div className="profile">
            <img src={`/profile/${UserData.profile.split("/").pop()}`} alt="" />
            <p>{UserData.username}</p>
            <button className="logout-button" onClick={HandleLogout}>
              Logout
            </button>
          </div>
          
          <p className="close-open" onClick={toggleNav}>
            <br />
            {sideNavOpen ? "\u2715 " + " Close " : "\u2630" + " Open "}
          </p>
          <div className={sideNavOpen ? "sidebar" : "sidebar_close"}>
            <Link to="/Admin_dashboard">
              <div className="div-awesome" >
                <FontAwesomeIcon
                  icon={faHouse}
                  style={{ marginLeft: "1rem", marginTop:'-0.3rem'}}
                />
                <h3>หน้าแรก</h3>
              </div>
            </Link>
            <Link to="/Admin_dashboard/ApproveOrder">
              <div className="div-awesome">
                <FontAwesomeIcon
                  icon={faCheckToSlot}
                  style={{ marginLeft: "1rem" }}
                />
                <h3>อนุมัติออเดอร์</h3>
              </div>
            </Link>
            <Accordion />

            {UserData.role === "manager" && (
              <>
                <Link to="/Admin_dashboard/User_edit">
                  <div className="div-awesome">
                    <FontAwesomeIcon
                      icon={faUserGear}
                      style={{ marginLeft: "1rem" }}
                    />
                    <h3>จัดการข้อมูลพนักงาน</h3>
                  </div>
                </Link>

                <Link to="/Admin_dashboard/Statistic-data">
                  <div className="div-awesome">
                    <FontAwesomeIcon
                      icon={faChartPie}
                      style={{ marginLeft: "1rem" }}
                    />

                    <h3>ข้อมูลเชิงสถิติ</h3>
                  </div>
                </Link>

                <Link to="/Admin_dashboard/Image_edit">
                <div className="div-awesome">
                    <FontAwesomeIcon
                      icon={faFileImage}
                      style={{ marginLeft: "1rem",}}
                    />
                    <h3>อัพโหลดรูปภาพโลโก้</h3>
                  </div>
                </Link>
              </>
            )}
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

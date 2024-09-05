import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import ShirtPreview from "../ShirtPreview/ShirtPreview";

function HomePage() {
  useEffect(() => {
    const adjustViewport = () => {
      //alert(window.innerWidth)
      const viewport = document.querySelector('meta[name="viewport"]');
      if (window.innerWidth <= 1910) {
        viewport.setAttribute("content", "width=device-width, initial-scale=0.29");
      } else {
        viewport.setAttribute("content", "width=device-width, initial-scale=1.0");
      }
    };

    adjustViewport();
  }, [window.innerWidth]);

  return (
    <div style={{ margin: "0 auto" }}>
      <nav className="navbar">
        <img
          style={{
            width: "13rem",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
          src="/General_image/Na_logo.png"
          alt="Na Logo"
        />
        <h3>บริการรับปักผ้าด้วยจักรปักคอมพิวเตอร์</h3>
      </nav>
      <div className="Cus-navbar">
        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/Na_Karn_puk/Cus_Home" className="navbar-link">
              หน้าแรก
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Na_Karn_puk/Cus_Order_Add" className="navbar-link">
              ส่งข้อมูลการปัก
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Na_Karn_puk/Cus_Order_Check" className="navbar-link">
              เช็คลำดับคิว
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
      <footer className="footer">
  <div className="footer-content">
    <FontAwesomeIcon icon={faLocationDot} className="footer-icon location-icon" />
    <h1 className="footer-title">ร้าน Na การปัก</h1>
    <h1 className="footer-address">
      128 ถนน เจริญสวัสดิ์ ตำบล ท่าไม้ อำเภอกระทุ่มแบน สมุทรสาคร 74110
    </h1>
  </div>
  <div className="footer-contact">
    <div className="contact-item">
      <FontAwesomeIcon icon={faPhone} className="footer-icon" />
      <h1 className="contact-info">เบอร์โทร : 0851914196</h1>
    </div>
    <div className="contact-item">
      <FontAwesomeIcon icon={faFacebook} className="footer-icon" />
      <h1 className="contact-info">Facebook : Pit Na</h1>
    </div>
    <div className="contact-item">
      <FontAwesomeIcon icon={faLine} className="footer-icon" />
      <h1 className="contact-info">Line : @na_karn_puk</h1>
    </div>
  </div>
</footer>

    </div>
  );
}

export default HomePage;

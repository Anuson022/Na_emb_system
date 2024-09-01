import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";

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
            <Link to="/Na-Karn-puk/Cus-Home" className="navbar-link">
              หน้าแรก
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Na-Karn-puk/Cus-Order-Add" className="navbar-link">
              ส่งข้อมูลการปัก
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Na-Karn-puk/Cus-Order-Check" className="navbar-link">
              เช็คลำดับคิว
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
      <footer
        style={{
          margin: "0 auto",
          fontFamily: "RSU_regular",
          minWidth: "70rem",
          backgroundColor: "#6AB187",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{ fontSize: "5rem", color: "red", display: "flex" }}
          />
          <h1 style={{ textAlign: "center" }}>ร้าน Na การปัก</h1>
          <h1 style={{ textAlign: "center", marginTop: "-1rem" }}>
            128 ถนน เจริญสวัสดิ์ ตำบล ท่าไม้ อำเภอกระทุ่มแบน สมุทรสาคร 74110
          </h1>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            height: "auto",
            backgroundColor: "#6AB187",
            padding: "2rem",
            gap: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faPhone} style={{ fontSize: "5rem" }} />
            <h1 style={{ textAlign: "center" }}>เบอร์โทร : 0851914196</h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faFacebook} style={{ fontSize: "5rem" }} />
            <h1 style={{ textAlign: "center" }}>Facebook : Pit Na</h1>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faLine} style={{ fontSize: "5rem" }} />
            <h1 style={{ textAlign: "center" }}>Line : @na_karn_puk</h1>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

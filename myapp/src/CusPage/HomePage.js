import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";

function HomePage() {
  return (
    <>
      <nav className="navbar">
        <img
          style={{
            width: "13rem",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
          src="/General_image/Na_logo.png"
          alt=""
        />
        <h3>บริการรับปักผ้าด้วยจักรปักคอมพิวเตอร์</h3>
      </nav>
      <div className="Cus-navbar">
        <ul className="navbar-menu">
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
    </>
  );
}

export default HomePage;

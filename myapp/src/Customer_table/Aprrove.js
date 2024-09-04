import axios from "axios";
import React, { useState, useEffect } from "react";
import './Approve.css'
import SweetAlert from "react-bootstrap-sweetalert";
import { useNavigate } from "react-router-dom";

const OrderApprovePage = () => {
  const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 1; // Number of orders to show per page
  const [DelID, setDelID] = useState("");
  const fetchNewOrder = async () => {
    try {
      const response = await axios.post("/api/NewOrder");
      console.log(response.data);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const navigate = useNavigate();

  const handleAddOrder = () => {
    navigate("/FullOrderAdd");
  };

  const handleApprove = (cus_id, info, parent_name, phone_number, status) => {
    const cus_data = { cus_id, info, parent_name, phone_number, status };
    navigate("/test_com", { state: { cus_data } });
  };

  const [popup_delete, setPopupDelete] = useState(null);
  const [showPopupDelete, setShowPopupDelete] = useState(false);

  const handleShowPopupDelete = (cus_id) => {
    setPopupDelete(cus_id);
    setShowPopupDelete(true);
  };

  const handleNo = () => {
    setShowPopupDelete(false);
  };

  const handleYesDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete_cusdata/${popup_delete}`);
      console.log("Data deleted successfully:", response.data);
      fetchNewOrder(); // Refresh the orders list
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setShowPopupDelete(false);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(order.length / ordersPerPage);
  
  useEffect(() => {
    fetchNewOrder();
  }, []);

  const ContainerStyle = () =>
    {
      if(order.length === 1){return "1fr"}
      if(order.length === 2){return "1fr 1fr"}
      if(order.length >= 3){return "1fr 1fr 1fr"}
    }

  return (
    <div>
      <div style={{backgroundColor:'blue',color:'white',padding:'0.1rem 1rem'}}><h2>อนุมัติออเดอร์</h2></div>
      <div style={{padding:'1rem'}}>
      <button className="AddOrderBtn"
        onClick={handleAddOrder}
      >
        เพิ่มออร์เดอร์
      </button>
      <br />
      <br />
      <div className="order-grid" style={{gridTemplateColumns: ContainerStyle()}}>
        {order ?(
          order.map((order, index) => (
            <>
            <div key={index} >
                <div className="div-border">
                <div></div>
                <p>
                  <strong>ลำดับออเดอร์:</strong>
                  <span>{order.cus_id}</span>
                </p>
                <p>
                  <strong>ชื่อผู้สั่ง:</strong>
                  <span>{order.parent_name}</span>
                </p>
                <p>
                  <strong>เบอร์โทร:</strong>
                  <span>{order.phone_number}</span>
                </p>
                <p>
                  <strong>สถานะ:</strong>
                  <span>{order.status}</span>
                </p>
                <div style={{display:'flex',gap:'2rem'}}>
                <button
                  onClick={() =>
                    handleApprove(
                      order.cus_id,
                      order.info,
                      order.parent_name,
                      order.phone_number,
                      order.status
                    )
                  }
                  className="ActionOrderBtn"
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                  }}
                >
                  อนุมัติ
                </button>
                <button
                  onClick={() => handleShowPopupDelete(order.cus_id)}
                  className="ActionOrderBtn"
                  style={{
                    backgroundColor: "#f44336",
                    color: "#fff",
                  }}
                >
                  ไม่อนุมัติ
                </button>
                </div>
                </div>
            </div>
            </>
            
          ))) : 
          <>
          <p>No data</p>
          </>
        }

      </div>
      </div>
      {showPopupDelete && (
        <SweetAlert
          warning
          title="ลบออเดอร์หรือไม่"
          onConfirm={() => {
            handleYesDelete();
          }}
          onCancel={() => {
            setShowPopupDelete(false);
          }}
          confirmBtnText="ใช่"
          cancelBtnText="ไม่"
          showCancel
          confirmBtnCssClass="btn-custom"
          cancelBtnCssClass="btn-custom"
          customClass="custom-sweetalert" // Custom class
          style={{ display: "flex", minWidth: "15rem", width: "22rem" }}
        ></SweetAlert>
      )}
    </div>
  );
};

export default OrderApprovePage;

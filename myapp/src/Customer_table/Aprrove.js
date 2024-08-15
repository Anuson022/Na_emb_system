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
    navigate("/test-com", { state: { cus_data } });
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
      const response = await axios.delete(`/delete_cusdata/${popup_delete}`);
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
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>อนุมัติออเดอร์</h1>
      <button
        onClick={handleAddOrder}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginRight: "10px",
          fontSize: "16px",
          backgroundColor: "#405cf5",
          color: "#fff",
        }}
      >
        เพิ่มออร์เดอร์
      </button>
      <br />
      <br />
      <div className="order-grid">
        {order ?(
          order.map((order, index) => (
            <>
            <div key={index}>
                <div className="div-border">
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
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "10px",
                    fontSize: "16px",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                  }}
                >
                  อนุมัติ
                </button>
                <button
                  onClick={() => handleShowPopupDelete(order.cus_id)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    marginRight: "10px",
                    fontSize: "16px",
                    backgroundColor: "#f44336",
                    color: "#fff",
                  }}
                >
                  ไม่อนุมัติ
                </button>
                </div>
            </div>
            </>
            
          ))) : 
          <>
          <p>No data</p>
          </>
        }

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

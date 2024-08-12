import axios from "axios";
import React, { useState, useEffect } from "react";
import ShirtOrder from "./ShirtOrder";

const OrderApprovePage = () => {
  const [order, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 1; // Number of orders to show per page

  const FetchNewOrder = async () => {
    const response = await axios.post("/api/NewOrder");
    console.log(response.data);
    setOrder(response.data);
    
  };

  useEffect(() => {
    FetchNewOrder();
  }, [currentPage]);

  const handleApprove = (index) => {
    const updatedOrders = [...order];
    updatedOrders[index].status = "Approved";
    setOrder(updatedOrders);
  };

  const handleReject = (index) => {
    const updatedOrders = [...order];
    updatedOrders[index].status = "Rejected";
    setOrder(updatedOrders);
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = order.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(order.length / ordersPerPage);

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
        onClick={handleReject}
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
      <div
        style={{
          gap: "10px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "100%",
        }}
      >
        {currentOrders.length > 0 ? (
          currentOrders.map((order, index) => (
            <div key={index}>
              <ShirtOrder
                cus_id={order.cus_id}
                parent_name={order.parent_name}
                phone_number={order.phone_number}
                status={order.status}
              />
              <>
                <button
                  onClick={() => handleApprove(indexOfFirstOrder + index)}
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
                  onClick={() => handleReject(indexOfFirstOrder + index)}
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
              </>
            </div>
          ))
        ) : (
          <p>No new orders available.</p>
        )}
      </div>
      
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
            fontSize: "16px",
            backgroundColor: currentPage === 1 ? "#ccc" : "#405cf5",
            color: "#fff",
          }}
        >
          Previous
        </button>
        <span style={{ fontSize: "16px", margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            backgroundColor:
              currentPage === totalPages ? "#ccc" : "#405cf5",
            color: "#fff",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderApprovePage;

import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import './App.css'; // Import your custom CSS file

const App = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = () => {
    setShowAlert(true);
  };

  const handleConfirm = () => {
    setShowAlert(false);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <h1>React SweetAlert Example</h1>
      <button onClick={handleAlert}>Show Alert</button>

      {showAlert && (
        <SweetAlert
          title="ยืนยันการส่งหรือไม่"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showCancel
          confirmBtnText="Yes"
          cancelBtnText="No"
          confirmBtnCssClass="btn-custom"
          cancelBtnCssClass="btn-custom"
          customClass="custom-sweetalert"
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      )}
    </div>
  );
};

export default App;

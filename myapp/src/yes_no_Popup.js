import React from 'react'
const yes_no_Popup = ({ message, onYes, onNo }) => {
    return (
      <div className="popup">
        <div className="popup-inner">
          <p>{message}</p>
          <button onClick={onYes}>Yes</button>
          <button onClick={onNo}>No</button>
        </div>
      </div>
    );
  };

export default yes_no_Popup
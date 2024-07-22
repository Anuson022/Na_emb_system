// Page1.js

import React from 'react';

const Page1 = ({ handleLogout }) => {
  return (
    <div>
      <h1>Page 1 (Manager)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Page1;

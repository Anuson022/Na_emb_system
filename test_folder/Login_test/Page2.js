// Page2.js

import React from 'react';

const Page2 = ({ handleLogout }) => {
  return (
    <div>
      <h1>Page 2 (Employee)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Page2;

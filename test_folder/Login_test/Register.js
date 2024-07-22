// Register.js

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { username, password, role });
      console.log(response.data.message);
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;

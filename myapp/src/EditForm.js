import React, { useState } from 'react';

const EditForm = ({ initialData }) => {
  const [formData, setFormData] = useState({

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to a server
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customer_id">Customer ID</label>
        <input
          type="text"
          id="customer_id"
          name="customer_id"
          value={formData.customer_id}
          readOnly
        />
      </div>
      <div>
        <label htmlFor="about">About</label>
        <textarea
          id="about"
          name="about"
          value={formData.about}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="parent_name">Parent Name</label>
        <input
          type="text"
          id="parent_name"
          name="parent_name"
          value={formData.parent_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;

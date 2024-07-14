import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [testImage, setTestImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/images');
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleText = (e) => {
    setName(e.target.value);
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    if (!name) {
      alert('Please insert name.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('image_name', name);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      alert('File uploaded successfully');
      fetchImages(); // Refresh the list of images
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/images/${id}`);
      alert('Image deleted successfully');
      fetchImages(); // Refresh the list of images
    } catch (err) {
      console.error(err);
      alert('Error deleting image');
    }
  };

  const CustomOption = (props) => {
    const { innerRef, innerProps, data } = props;
    return (
      <div ref={innerRef} {...innerProps} className="custom-option">
        <img src={data.image} alt={data.label} style={{ width: 20, height: 20, marginRight: 10, marginTop: 10 }} />
        {data.label}
      </div>
    );
  };

  const optionTest = images.map((item) => ({
    value: item.School_name,
    label: item.School_name,
    image: `http://localhost:5000${item.path}`,
  }));

  const handleChange = (e) => {
    setTestImage(e.image);
  };

  return (
    <div>
      <input
        id="fileInput"
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleButtonClick}>Select File</button>
      <button onClick={handleFileUpload}>Upload</button>
      <input onChange={handleText} type="text" />
      <div style={{ width: 300, margin: '0 auto', marginTop: 50 }}>
        <Select
          options={optionTest}
          components={{ Option: CustomOption }}
          placeholder="Select a fruit"
          onChange={handleChange}
        />
        <div>
          <img src={testImage} alt="" />
        </div>
      </div>

      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={`http://localhost:5000${image.path}`}
              alt="Uploaded"
              style={{ width: '200px', height: '100px', margin: '10px' }}
            />
            <p>{image.School_name}</p>
            <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
